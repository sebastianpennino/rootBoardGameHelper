import { useNavigate } from 'react-router-dom'
import { Faction, FactionNames, Methods, Player, ValidFactions } from '../../types'
import { useState } from 'react'
import { allFactions as importedFactions } from '../../data'
import { players as importedPlayers } from '../../mock'

// Styles
import '../../css/select-page.css'

interface PrioritizableFaction extends Faction {
  priority: number | boolean
}

interface minFaction {
  id: number
  name: ValidFactions
  priority: number
}

const PRIORITY_SELECTION: number = 6

export function PrioritySelect() {
  let navigate = useNavigate()

  const cleanFactions: PrioritizableFaction[] = importedFactions
    .filter((faction: Faction) => {
      return faction.name !== FactionNames.VAGABOND2
    })
    .map((faction: Faction) => ({
      ...faction,
      priority: false,
    }))

  const [players, setPlayers] = useState<Player[]>([...importedPlayers])
  const [currentPlayer, setCurrentPlayer] = useState<Player>(players[0])
  const [availablefactions, setAvailableFactions] = useState<PrioritizableFaction[]>(cleanFactions)
  const [loop, setLoop] = useState<number>(0)
  const [lock, setLock] = useState<boolean>(false)
  const [selection, setSelection] = useState<any>([])
  const [priority, setPriority] = useState<number>(1)

  const setUpNextLoop = () => {
    // Save current selection
    setSelection((previousSelected: any) => {
      const found: minFaction[] = availablefactions
        .filter((faction) => faction.priority !== false)
        .map(({ name, id, priority }) => ({ name, id, priority: Number(priority) }))
      if (found && found.length > 0) {
        return [
          ...previousSelected,
          {
            player: currentPlayer,
            selection: found.sort((a: minFaction, b: minFaction) => a.priority - b.priority),
          },
        ]
      }
      return previousSelected
    })
    // Reset available factions
    setAvailableFactions((oldSelection: PrioritizableFaction[]) => {
      return oldSelection.map((faction: PrioritizableFaction) => ({
        ...faction,
        priority: false,
      }))
    })
    // Increase the loop, set currentPlayer for next cycle
    setLoop((loop) => {
      const nextLoop = loop + 1
      setCurrentPlayer(players[nextLoop])
      return nextLoop
    })
    // Reset priority
    setPriority(1)
    // Unlock
    setLock(false)
  }

  const selectFaction = (faction: PrioritizableFaction) => {
    setAvailableFactions((oldSelection: PrioritizableFaction[]) => {
      const foundIdx = oldSelection.findIndex((f: PrioritizableFaction) => f.id === faction.id)
      if (oldSelection[foundIdx].priority === false) {
        oldSelection[foundIdx] = { ...oldSelection[foundIdx], priority: priority }
      }
      return [...oldSelection]
    })
    setPriority((priority) => {
      if (priority >= PRIORITY_SELECTION) {
        setLock(true)
      }
      return priority + 1
    })
  }

  const finalize = () => {
    // Save current selection
    setSelection((previousSelected: any) => {
      const found = availablefactions.filter((faction) => faction.priority !== false)
      if (found && found.length > 0) {
        return [
          ...previousSelected,
          {
            player: currentPlayer,
            selection: [...found],
          },
        ]
      }
      return previousSelected
    })
    setLock(false)
    navigate(`/results?type=${Methods.PRIORITY}`, { replace: true })
  }

  return (
    <>
      <div>
        {currentPlayer.name} - {loop + 1} of {players.length}
      </div>
      <div>
        <h3>Prioritize Factions (1 to {PRIORITY_SELECTION}):</h3>
        <div>
          <ul>
            {availablefactions.map((faction: PrioritizableFaction) => (
              <button
                key={faction.id}
                onClick={() => {
                  if (!lock) {
                    selectFaction(faction)
                  }
                }}
              >
                {faction.name} {faction.priority ? `(${faction.priority})` : ''}
                <figure className="faction-picture">
                  <img src={faction.icon} alt={faction.name} />
                </figure>
              </button>
            ))}
          </ul>
        </div>
      </div>

      {/* 
      <small>
        <pre>{JSON.stringify({ selection }, null, 2)}</pre>
      </small> 
      */}

      <div>
        {loop < players.length - 1 ? (
          <button onClick={setUpNextLoop} disabled={!lock}>
            Save & Continue
          </button>
        ) : (
          <button onClick={finalize} disabled={!lock}>
            Finalize
          </button>
        )}
      </div>
    </>
  )
}
