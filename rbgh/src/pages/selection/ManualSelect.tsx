import '../../css/select-page.css'
import { Faction, Methods, Player, ResultEntries } from '../../types'
import { minReachByPlayers, allFactions as importedFactions } from '../../data'
import { NavLink } from 'react-router-dom'
import { RBGHContext } from '../../Store'
import { useContext, useEffect, useState } from 'react'

export interface SelectableFaction extends Faction {
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
  // const [players, setPlayers] = useState<Player[]>([])
  const [availablefactions, setAvailableFactions] = useState<SelectableFaction[]>(cleanFactions)
  const [loop, setLoop] = useState<number>(0)

  const { playerList: players } = useContext<any>(RBGHContext)
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  const [selection, setSelection] = useState<SelectableFaction[]>([])

  useEffect(() => {
    if (players.length > 0) {
      setCurrentPlayer(players[0])
    }
  }, [players])

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
  }

  const selectFaction = (faction: SelectableFaction, flag: boolean) => {
    setAvailableFactions((oldSelection: SelectableFaction[]) => {
      return oldSelection.map((f: SelectableFaction) => {
        if (f.id === faction.id) {
          f.selected = flag
        } else {
          f.selected = false
        }
        return f
      })
    })
  }

  const calculateSelectedReach = () => {
    const totalbeforeSelection =
      selection.reduce((totalReach: number, faction: SelectableFaction) => {
        return totalReach + faction.reach
      }, 0) || 0
    const currentSelection =
      availablefactions.find((faction: SelectableFaction) => {
        return faction.selected
      })?.reach || 0
    return totalbeforeSelection + currentSelection
  }

  return (
    <article className="manual-page">
      {players.length > 0 && currentPlayer && (
        <>
          <hgroup>
            <h3>
              <em title="player name">{currentPlayer.name}</em>, select your faction:
            </h3>
            <h4>
              (Selection {loop + 1} of {players.length})
            </h4>
          </hgroup>
          <div>
            <ol className="faction-grid">
              {availablefactions.map((faction: SelectableFaction) => (
                <li key={faction.id} className="faction-card">
                  <button
                    className={`btn btn__grow-ellipse ${faction.selected ? 'selected' : ''}`}
                    style={{ borderColor: `${faction.backColor}`, backgroundColor: `${faction.backColor}` }}
                    onClick={() => {
                      selectFaction(faction, true)
                    }}
                  >
                    <figure className="faction-picture">
                      <img src={faction.icon} alt={faction.name} />
                    </figure>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div>
            Selected:{' '}
            {availablefactions.find((faction: SelectableFaction) => {
              return faction.selected
            })?.name || 'None'}{' '}
            (Reach:{' '}
            {availablefactions.find((faction: SelectableFaction) => {
              return faction.selected
            })?.reach || 0}
            )
          </div>

          <div>
            Total Reach: {calculateSelectedReach()} of a recommended {minReachByPlayers[players.length]}
          </div>
          <div>
            {loop < players.length - 1 ? (
              <button className="fake-btn-next" onClick={setUpNextLoop}>
                Save & Continue
              </button>
            ) : (
              <div className="fake-btn">
                <NavLink to={`/results?type=${Methods.PICK}`}>Finalize: Results Pick</NavLink>
              </div>
            )}
            <div className="fake-btn">
              <NavLink to="/">Back to start</NavLink>
            </div>
          </div>
        </>
      )}
    </article>
  )
}
