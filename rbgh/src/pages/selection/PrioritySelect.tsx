import '../../css/select-page.css'
import { Faction, FactionNames, Methods, Player } from '../../types'
import { Reducer, useContext, useReducer } from 'react'
import { allFactions } from '../../data'
import { RBGHContext, RBGHStoreContent } from '../../Store'
import { PRIORITY_SELECTION } from '../../App'
import { SelectionHeading, FactionPriorityItem, SelectionFooter, BackButton } from '../../components'
import { players } from '../../mock'
import { useNavigate } from 'react-router-dom'

interface PriorityState {
  factionList: Faction[]
  priorityArr: (number | string)[]
  loop: number
}

export enum PriorityReducerActionTypes {
  ASSIGN_PRIORITY = 'ASSIGN_PRIORITY',
  REMOVE_PRIORITY = 'REMOVE_PRIORITY',
  RESET_LOOP = 'RESET_LOOP',
  INCREASE_LOOP = 'INCREASE_LOOP',
}

export type ValidPriorityReducerActionTypes =
  | PriorityReducerActionTypes.ASSIGN_PRIORITY
  | PriorityReducerActionTypes.REMOVE_PRIORITY
  | PriorityReducerActionTypes.RESET_LOOP
  | PriorityReducerActionTypes.INCREASE_LOOP

export interface PriorityAction {
  type: ValidPriorityReducerActionTypes
  payload: { factionSuperId: string; playerId: number; newPriority?: number }
}

export const priorityReducer = (state: PriorityState, action: PriorityAction): PriorityState => {
  const { factionSuperId, playerId } = action?.payload ?? {}
  const { factionList } = state
  const found = factionList.find((faction: Faction) => faction.superId === factionSuperId)
  const currentPlayerFactions = factionList.filter((faction: Faction) => faction.playerOwnerId === playerId)
  const findNextemptyPriorityIndex = currentPlayerFactions.filter((faction: Faction) => {
    return faction.priority !== 99
  }).length

  switch (action.type) {
    case PriorityReducerActionTypes.ASSIGN_PRIORITY:
      if (found && findNextemptyPriorityIndex < PRIORITY_SELECTION && found.priority === 99) {
        found.priority = findNextemptyPriorityIndex
        return {
          ...state,
          factionList: [...factionList],
        }
      }
      return state
    case PriorityReducerActionTypes.REMOVE_PRIORITY:
      if (found && found.priority === findNextemptyPriorityIndex - 1 && found.priority !== 99) {
        found.priority = 99
        return {
          ...state,
          factionList: [...factionList],
        }
      }
      return state
    case PriorityReducerActionTypes.RESET_LOOP:
      return {
        ...state,
        loop: 0,
      }
    case PriorityReducerActionTypes.INCREASE_LOOP:
      return {
        ...state,
        loop: state.loop + 1,
      }
    default:
      throw new Error('unknown action!')
  }
}

let initialPriorityList: PriorityState = {
  factionList: [],
  priorityArr: [],
  loop: 0,
}

// Loop selection, passing the control to each player
// Each player assign a priority number to each faction
export function PrioritySelect() {
  const { playerList, setFilter, derivePriorityResults } = useContext<RBGHStoreContent>(RBGHContext)
  let navigate = useNavigate()

  // At the start I copy all the factions based on the playerList
  const cleanFactions = allFactions.filter((faction: Faction) => {
    return faction.name !== FactionNames.VAGABOND2
  })

  const megaFactionList = playerList.flatMap((player: Player, idx: number): Faction[] => {
    return cleanFactions.map((faction: Faction) => {
      return { ...faction, playerOwnerId: player.id, superId: player.id + '-' + (faction.id + 1) }
    })
  })

  const emptyPriority = Array(PRIORITY_SELECTION).fill(0)

  initialPriorityList.factionList = megaFactionList
  initialPriorityList.priorityArr = emptyPriority

  const [priorityState, priorityDispatch] = useReducer<Reducer<PriorityState, PriorityAction>>(priorityReducer, {
    ...initialPriorityList,
  })

  const isFinalLoop = priorityState.loop + 1 === playerList.length

  const setupNextLoop = () => {
    console.log('nextLoop')
    console.log('current state: ', { loop: priorityState.loop, len: playerList.length })
    if (!isFinalLoop) {
      priorityDispatch({
        type: PriorityReducerActionTypes.INCREASE_LOOP,
        payload: { factionSuperId: '', playerId: -1 },
      })
    } else {
      console.log('derivePriorityResults')
      derivePriorityResults()
      navigate(`/results?type=${Methods.PRIORITY}`, { replace: false })
    }
  }

  const selectFaction = (faction: Faction) => {
    const factionSuperId: string = faction.superId || ''
    const currentPlayer = playerList[priorityState.loop]
    if (faction.priority !== 99) {
      priorityDispatch({
        type: PriorityReducerActionTypes.REMOVE_PRIORITY,
        payload: { factionSuperId, playerId: currentPlayer.id, newPriority: faction.priority },
      })
    } else {
      priorityDispatch({
        type: PriorityReducerActionTypes.ASSIGN_PRIORITY,
        payload: { factionSuperId, playerId: currentPlayer.id, newPriority: faction.priority },
      })
    }
    setFilter(priorityState.factionList)
  }

  const isValidPrioritySelection = (): true | React.ReactNode => {
    const selections = priorityState.factionList.filter((faction: Faction) => {
      return faction.playerOwnerId === playerList[priorityState.loop].id && faction.priority < 99
    })
    if (selections.length < PRIORITY_SELECTION) {
      return (
        <p className="error-msg">
          To continue, you must select {PRIORITY_SELECTION - selections.length} additional faction(s) (for a total of{' '}
          {PRIORITY_SELECTION} factions)
        </p>
      )
    }
    return true
  }

  return (
    <article className="priority-page">
      {players.length > 0 && playerList[priorityState.loop] && (
        <>
          <SelectionHeading
            playerName={playerList[priorityState.loop].name}
            loop={priorityState.loop}
            totalLoops={playerList.length}
            desc="select your priorities"
          />
          <ul className="faction-list">
            {priorityState.factionList
              .filter((faction: Faction) => {
                return faction.playerOwnerId === playerList[priorityState.loop].id
              })
              .map((faction: Faction) => (
                <FactionPriorityItem key={faction.superId} faction={faction} handleClick={selectFaction} />
              ))}
          </ul>
        </>
      )}
      {isValidPrioritySelection() === true ? (
        <SelectionFooter
          loop={priorityState.loop}
          players={playerList}
          setupNextLoop={setupNextLoop}
          method={Methods.PRIORITY}
        />
      ) : (
        isValidPrioritySelection()
      )}
      <BackButton />
    </article>
  )
}
