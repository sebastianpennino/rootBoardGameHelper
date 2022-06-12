import '../../css/select-page.css'
import { Faction, FactionNames, Methods, Player } from '../../types'
import { Reducer, useContext, useReducer } from 'react'
import { allFactions } from '../../data'
import { RBGHContext, RBGHStoreContent } from '../../Store'
import { PRIORITY_SELECTION } from '../../App'
import { SelectionHeading, FactionPriorityItem, SelectionFooter, BackButton } from '../../components'
import { players } from '../../mock'

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

interface FactionFilterReducer {
  currentPlayerSelection: Faction[]
  otherFactions: Faction[]
}

export const priorityReducer = (state: PriorityState, action: PriorityAction): PriorityState => {
  const { factionSuperId, playerId, newPriority } = action?.payload ?? {}
  console.log('priorityReducer', factionSuperId, playerId, newPriority)

  const { factionList, priorityArr } = state
  // const { currentPlayerSelection, otherFactions } = factionList.reduce(
  //   (acc: FactionFilterReducer, faction: Faction) => {
  //     if (faction.playerOwnerId === playerId) {
  //       acc.currentPlayerSelection.push(faction)
  //     } else {
  //       acc.otherFactions.push(faction)
  //     }
  //     return acc
  //   },
  //   { currentPlayerSelection: [], otherFactions: [] },
  // )
  // const foundIdx = currentPlayerSelection.findIndex((faction: Faction) => faction.superId === factionSuperId)
  const foundIdx = factionList.findIndex((faction: Faction) => faction.superId === factionSuperId)
  const findNextemptyPriorityIndex = priorityArr.findIndex((slot) => slot === 0)
  // currentPlayerSelection.sort((a: Faction, b: Faction) => {
  //   return a.priority - b.priority
  // })
  const emptyPriority = Array(PRIORITY_SELECTION).fill(0)

  switch (action.type) {
    case PriorityReducerActionTypes.ASSIGN_PRIORITY:
      console.log('case ASSIGN_PRIORITY, findNextemptyPriorityIndex: ', findNextemptyPriorityIndex)
      if (foundIdx !== -1) {
        console.log('here!')
        factionList[foundIdx].priority = findNextemptyPriorityIndex ?? 99
        // const newPriorityArr = [...priorityArr]
        // newPriorityArr[findNextemptyPriorityIndex] = factionSuperId
        return {
          ...state,
          // priorityArr: newPriorityArr,
          factionList: [...factionList],
        }
      }
      return state
    case PriorityReducerActionTypes.REMOVE_PRIORITY:
      console.log('case REMOVE_PRIORITY')
      if (foundIdx !== -1) {
        // currentPlayerSelection[foundIdx].priority = 99
        // return {
        //   ...state,
        //   priorityArr: priorityArr.map((slot) => {
        //     if (slot === factionId) {
        //       return 0
        //     }
        //     return slot
        //   }),
        //   factionList: [...otherFactions, ...currentPlayerSelection],
        // }
      }
      return state
    case PriorityReducerActionTypes.RESET_LOOP:
      return {
        ...state,
        priorityArr: emptyPriority,
        loop: 0,
      }
    case PriorityReducerActionTypes.INCREASE_LOOP:
      return {
        ...state,
        priorityArr: emptyPriority,
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
  const { playerList, filter, setFilter, derivePriorityResults } = useContext<RBGHStoreContent>(RBGHContext)

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

  const setupNextLoop = () => {
    priorityDispatch({ type: PriorityReducerActionTypes.INCREASE_LOOP, payload: { factionSuperId: '', playerId: -1 } })
  }

  const selectFaction = (faction: Faction) => {
    console.log('selectFaction ', faction)
    const factionSuperId: string = faction.superId || ''
    const currentPlayer = playerList[priorityState.loop]
    if (faction.priority !== 99) {
      console.log('Remove priority')
      priorityDispatch({
        type: PriorityReducerActionTypes.REMOVE_PRIORITY,
        payload: { factionSuperId, playerId: currentPlayer.id, newPriority: faction.priority },
      })
    } else {
      console.log('assign priority')
      priorityDispatch({
        type: PriorityReducerActionTypes.ASSIGN_PRIORITY,
        payload: { factionSuperId, playerId: currentPlayer.id, newPriority: faction.priority },
      })
    }
  }

  const isValidPrioritySelection = (): true | React.ReactNode => {
    const hasInvalidSelection = priorityState.priorityArr.filter((val: number | string) => {
      return val === 0
    })
    if (hasInvalidSelection.length > 0) {
      return (
        <p className="error-msg">
          To continue, you must select {hasInvalidSelection.length} additional faction(s) (for a total of{' '}
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
          <pre style={{ fontSize: '15px' }}>
            {JSON.stringify(
              {
                priorityState: priorityState.factionList.map((faction) => ({
                  sId: faction.superId,
                  p: faction.priority,
                })),
              },
              null,
              2,
            )}
          </pre>
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
