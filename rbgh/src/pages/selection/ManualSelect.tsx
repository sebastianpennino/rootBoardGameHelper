import '../../css/select-page.css'
import { Faction, Player, ResultEntries } from '../../types'
import { allFactions as importedFactions } from '../../data'
import { RBGHContext } from '../../Store'
import { useContext, useEffect, useState } from 'react'
import { SelectionHeading } from '../../components/SelectionHeading'
import { SelectionFooter } from '../../components/SelectionFooter'
import { FactionManualItem } from '../../components/FactionManualItem'

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
          <SelectionHeading
            desc="select your faction"
            loop={loop}
            playerName={currentPlayer.name}
            totalLoops={players.length}
          />
          <ol className="faction-grid">
            {availablefactions.map((faction: SelectableFaction) => (
              <FactionManualItem key={faction.id} faction={faction} selectFaction={selectFaction} />
            ))}
          </ol>
          <SelectionFooter />
        </>
      )}
    </article>
  )
}
