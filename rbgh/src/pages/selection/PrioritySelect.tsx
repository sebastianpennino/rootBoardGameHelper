import { NavLink } from 'react-router-dom'
import { Faction, FactionNames, Methods, Player } from '../../types'
import { useState } from 'react'
import { allFactions as importedFactions } from '../../data'
import { players as importedPlayers } from '../../mock'

// Styles
import '../../css/select-page.css'

export interface PrioritizableFaction extends Faction {
  priority: number
}
export interface PrioritizableFactionWithId extends PrioritizableFaction {
  playerOwnerId: number
}
export interface PrioritySelection {
  player: Player
  selection: PrioritizableFaction[]
}

export function PrioritySelect() {
  const cleanFactions: PrioritizableFaction[] = importedFactions
    .filter((faction: Faction) => {
      return faction.name !== FactionNames.VAGABOND2
    })
    .map((faction: Faction) => ({
      ...faction,
      priority: 99,
    }))

  const [players, setPlayers] = useState<Player[]>([...importedPlayers])
  const [currentPlayer, setCurrentPlayer] = useState<Player>(players[0])
  const [availablefactions, setAvailableFactions] = useState<PrioritizableFaction[]>(cleanFactions)
  const [loop, setLoop] = useState<number>(0)
  const [selection, setSelection] = useState<PrioritySelection[]>([])

  const PRIORITY_SELECTION: number = 6
  const emptyPriority = Array(PRIORITY_SELECTION).fill(0)
  const [priorityArr, setPriorityArr] = useState<number[]>([...emptyPriority])

  const setUpNextLoop = () => {
    // Save current selection
    setSelection((previousSelected: PrioritySelection[]) => {
      const found: PrioritizableFaction[] = availablefactions.filter((faction) => faction.priority !== 99)
      if (found && found.length > 0) {
        return [
          ...previousSelected,
          {
            player: currentPlayer,
            selection: found.sort((a: PrioritizableFaction, b: PrioritizableFaction) => a.priority - b.priority),
          },
        ]
      }
      return previousSelected
    })
    // Reset available factions
    setAvailableFactions((oldSelection: PrioritizableFaction[]) => {
      return oldSelection.map((faction: PrioritizableFaction) => ({
        ...faction,
        priority: 99,
      }))
    })
    if (loop === players.length - 1) {
      setLoop((loop) => {
        const nextLoop = loop + 1
        return nextLoop
      })
      return
    }
    // Increase the loop, set currentPlayer for next cycle
    setLoop((loop) => {
      const nextLoop = loop + 1
      setCurrentPlayer(players[nextLoop])
      return nextLoop
    })
    // Reset priority
    setPriorityArr([...emptyPriority])
  }

  const selectFaction = (faction: PrioritizableFaction) => {
    const savedPriority = faction.priority
    const findNextemptySlotIdx = priorityArr.findIndex((slot) => slot === 0)

    if (savedPriority !== 99) {
      setPriorityArr((priorityArr) => {
        let newPriorityArr = [...priorityArr]
        newPriorityArr = priorityArr.map((slot) => {
          if (slot === faction.id) {
            return 0
          }
          return slot
        })
        return newPriorityArr
      })
      setAvailableFactions((oldSelection: PrioritizableFaction[]) => {
        const foundIdx = oldSelection.findIndex((f: PrioritizableFaction) => f.id === faction.id)
        if (oldSelection[foundIdx].priority !== 99) {
          oldSelection[foundIdx] = { ...oldSelection[foundIdx], priority: 99 }
        }
        return [...oldSelection]
      })
    } else if (findNextemptySlotIdx !== -1) {
      setPriorityArr((priorityArr) => {
        let newPriorityArr = [...priorityArr]
        newPriorityArr[findNextemptySlotIdx] = faction.id
        return newPriorityArr
      })
      setAvailableFactions((oldSelection: PrioritizableFaction[]) => {
        const foundIdx = oldSelection.findIndex((f: PrioritizableFaction) => f.id === faction.id)
        if (oldSelection[foundIdx].priority === 99) {
          oldSelection[foundIdx] = { ...oldSelection[foundIdx], priority: findNextemptySlotIdx }
        }
        return [...oldSelection]
      })
    } else {
      // need to un-assing to have space!
    }
  }

  return (
    <div className="priority-page">
      <div>
        {currentPlayer?.name} - {loop + 1} of {players.length}
      </div>
      <div>
        {/* <h3>(1 to {PRIORITY_SELECTION}):</h3> */}
        <div>
          <ul className="faction-list">
            {availablefactions.map((faction: PrioritizableFaction) => (
              <li
                key={faction.id}
                className={`faction-item faction-priority-${faction.priority < 99 ? 'on' : 'off'} 
                  faction-color-${faction.backColor}`}
              >
                <button
                  className={`faction-item-row ${faction.priority < 99 ? 'faction-item-row__hasPriority' : ''}`}
                  onClick={() => {
                    selectFaction(faction)
                  }}
                  disabled={faction.priority < 99 && false}
                >
                  <figure className="faction-item-column faction-item-pic">
                    <img src={faction.icon} alt={faction.name} />
                  </figure>
                  <div className="faction-item-column faction-item-name">
                    <h4>{faction.name}</h4>
                    <span>(Reach: {faction.reach})</span>
                  </div>
                  <div className="faction-item-column faction-item-priority circle">
                    <span className="priority">{faction.priority < 99 ? faction.priority + 1 : ''}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* <small><pre>{JSON.stringify({ selection }, null, 2)}</pre></small> */}

      <div>
        {loop <= players.length - 1 ? (
          <button
            className="fake-btn-next"
            onClick={setUpNextLoop}
            disabled={
              priorityArr.reduce((acc, curr) => {
                return acc + (curr !== 0 ? 1 : 0)
              }, 0) < PRIORITY_SELECTION
            }
          >
            Save & Continue
          </button>
        ) : (
          <div className="fake-btn">
            <NavLink to={`/results?type=${Methods.PRIORITY}`} className={(n) => (n.isActive ? 'active' : '')}>
              Finalize: Results Priority
            </NavLink>
          </div>
        )}
        <div className="fake-btn">
          <NavLink to="/">Back to start</NavLink>
        </div>
      </div>
    </div>
  )
}
