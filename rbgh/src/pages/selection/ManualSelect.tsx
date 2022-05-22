import { players as importedPlayers } from '../../mock'
import { useEffect, useState } from 'react'
import { Faction, Methods, ResultEntries } from '../../types'
import { minReachByPlayers, allFactions as importedFactions } from '../../data'
import { NavLink } from 'react-router-dom'

// Styles
import '../../css/select-page.css'

interface SelectableFaction extends Faction {
  selected: boolean
}
export interface PickSelection {
  results: ResultEntries[]
}

export function ManualSelect() {
  const cleanFactions: SelectableFaction[] = importedFactions.map((faction: Faction) => ({
    ...faction,
    selected: false,
  }))
  const [players, setPlayers] = useState<any>([...importedPlayers])
  const [currentPlayer, setCurrentPlayer] = useState<any>(players[0])
  const [availablefactions, setAvailableFactions] = useState<SelectableFaction[]>(cleanFactions)
  const [loop, setLoop] = useState<number>(0)
  const [lock, setLock] = useState<boolean>(false)
  const [selection, setSelection] = useState<SelectableFaction[]>([])

  useEffect(() => {
    //setPlayers([...importedPlayers])
  }, [])

  const setUpNextLoop = () => {
    // Save selection
    setSelection((selection: SelectableFaction[]) => {
      const found = availablefactions.find((faction) => faction.selected)
      if (found) {
        return [...selection, found]
      }
      return selection
    })
    // Remove faction from availablefactions
    setAvailableFactions((oldSelection: SelectableFaction[]) => {
      return oldSelection.filter((f: SelectableFaction) => {
        return !f.selected
      })
    })
    // Increase the loop, set currentPlayer for next cycle
    setLoop((loop) => {
      const nextLoop = loop + 1
      setCurrentPlayer(players[nextLoop])
      return nextLoop
    })
    // Unlock
    setLock(false)
  }

  const selectFaction = (faction: SelectableFaction, flag: boolean) => {
    setAvailableFactions((oldSelection: SelectableFaction[]) => {
      const foundIdx = oldSelection.findIndex((f: SelectableFaction) => f.id === faction.id)
      oldSelection[foundIdx] = { ...oldSelection[foundIdx], selected: flag }
      return [...oldSelection]
    })
    setLock(flag)
  }

  const finalize = () => {
    console.log('FINALIZE!!!!')
  }

  return (
    <div className="manual-page">
      <div>
        {currentPlayer.name} - {loop + 1} of {players.length}
      </div>
      <div>
        <h3>Available factions:</h3>
        <div>
          <ol className="faction-grid">
            {availablefactions.map((faction: SelectableFaction) => (
              <li key={faction.id} className="faction-card">
                <button
                  className="btn btn__grow-ellipse"
                  style={{ borderColor: `${faction.backColor}`, backgroundColor: `${faction.backColor}` }}
                  onClick={() => {
                    if (!lock) {
                      selectFaction(faction, true)
                    } else if (lock && faction.selected) {
                      selectFaction(faction, false)
                    }
                  }}
                >
                  {/* {faction.name} {faction.selected ? '- selected!' : ''} */}
                  <figure className="faction-picture">
                    <img src={faction.icon} alt={faction.name} />
                  </figure>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="wrapper">
        <button className="btn btn__slide-from-left">SLIDE FROM LEFT</button>
        <button className="btn btn__grow-box">GROW BOX</button>
        <button className="btn btn__grow-ellipse">GROW ELLIPSE</button>
      </div>

      <div>
        SELECTED:{' '}
        {
          availablefactions.find((faction: SelectableFaction) => {
            return faction.selected
          })?.name
        }
      </div>

      <div>
        Total Reach:{' '}
        {selection.reduce((totalReach, faction) => {
          return totalReach + faction.reach
        }, 0)}{' '}
        of {minReachByPlayers[players.length]}
      </div>
      <div>
        {loop < players.length - 1 ? (
          <button onClick={setUpNextLoop}>Save & Continue</button>
        ) : (
          <NavLink to={`/results?type=${Methods.PICK}`} className={(n) => (n.isActive ? 'active' : '')}>
            R: Pick
          </NavLink>
        )}
      </div>
    </div>
  )
}
