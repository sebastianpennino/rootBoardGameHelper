import '../../css/select-page.css'
import { Faction, Methods, Player, ResultEntries } from '../../types'
import { allFactions as importedFactions } from '../../data'
import { RBGHContext, RBGHStoreContent } from '../../Store'
import { useContext, useEffect, useState } from 'react'
import { BackButton, FactionManualItem, ReachCalculator, SelectionFooter, SelectionHeading } from '../../components'
import { useNavigate } from 'react-router-dom'

// Loop selection, passing the control to each player
// Each player selects a faction and that faction is no longer available to the next player
export function PickManualSelect() {
  const navigate = useNavigate()
  const {
    playerList: players,
    result,
    setResult,
    resetFilter,
    resetResults,
  } = useContext<RBGHStoreContent>(RBGHContext)

  const cleanFactions: Faction[] = importedFactions.map((faction: Faction) => ({
    ...faction,
    selected: false,
  }))

  const [availablefactions, setAvailableFactions] = useState<Faction[]>(cleanFactions)
  const [loop, setLoop] = useState<number>(0)
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
    // on the first run reset everything
    if (players.length > 0) {
      setCurrentPlayer(players[0])
    }
    resetFilter()
    resetResults()
  }, [])

  useEffect(() => {
    if (result.length >= players.length) {
      navigate(`/results?type=${Methods.PICK}`, { replace: false })
    }
  }, [result.length, players.length])

  const setupNextLoop = () => {
    // Save selection directly to restuls
    setResult((previousResults: ResultEntries[]) => {
      const found = availablefactions.find((faction) => faction.selected)
      if (found) {
        return [
          ...previousResults,
          {
            id: currentPlayer?.id ?? -99,
            name: currentPlayer?.name ?? '',
            faction: found,
          },
        ]
      }
      return previousResults
    })
    // Remove faction from availablefactions
    setAvailableFactions((oldSelection: Faction[]) => {
      return oldSelection.filter((f: Faction) => {
        return !f.selected
      })
    })
    // Increase the loop, set currentPlayer for next cycle
    setLoop((loop) => {
      const nextLoop = loop + 1
      if (players[nextLoop]) {
        setCurrentPlayer(players[nextLoop])
      }
      return nextLoop
    })
  }

  // Select current faction and de-select the rest
  const selectFaction = (faction: Faction, flag: boolean) => {
    setAvailableFactions((oldSelection: Faction[]) => {
      return oldSelection.map((f: Faction) => {
        if (f.id === faction.id) {
          f.selected = flag
        } else {
          f.selected = false
        }
        return f
      })
    })
  }

  const selected = availablefactions.find((faction: Faction) => faction.selected)

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
            {availablefactions.map((faction: Faction) => (
              <FactionManualItem key={faction.id} faction={faction} selectFaction={selectFaction} />
            ))}
          </ol>
          <ReachCalculator availablefactions={availablefactions} selection={result} players={players} />
          <SelectionFooter
            loop={loop}
            players={players}
            setupNextLoop={setupNextLoop}
            method={Methods.PICK}
            disabled={!selected}
          />
          <BackButton />
        </>
      )}
    </article>
  )
}
