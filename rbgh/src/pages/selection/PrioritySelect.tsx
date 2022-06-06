import '../../css/select-page.css'
import { Faction, FactionNames, Methods, Player } from '../../types'
import { useContext, useEffect, useState } from 'react'
import { allFactions as importedFactions } from '../../data'
import { RBGHContext, RBGHStoreContent } from '../../Store'
import { SelectionHeading } from '../../components/SelectionHeading'
import { SelectionFooter } from '../../components/SelectionFooter'
import { FactionPriorityItem } from '../../components/FactionPriorityItem'
import { BackButton } from '../../components/BackButton'
import { PRIORITY_SELECTION } from '../../App'
import { useNavigate } from 'react-router-dom'

// Loop selection, passing the control to each player
// Each player assign a priority number to each faction
export function PrioritySelect() {
  const navigate = useNavigate()
  const {
    playerList: players,
    priorityCompleted,
    setFilter: setSelection,
    resetFilter,
    resetResults,
    derivePriorityResults,
  } = useContext<RBGHStoreContent>(RBGHContext)
  const emptyPriority = Array(PRIORITY_SELECTION).fill(0)

  useEffect(() => {
    // on the first run reset everything
    resetFilter()
    resetResults()
  }, [])

  //const [players, setPlayers] = useState<Player[]>([...playerList])
  const [currentPlayer, setCurrentPlayer] = useState<Player>(players[0])
  const [availablefactions, setAvailableFactions] = useState<Faction[]>(
    importedFactions.filter((faction: Faction) => {
      return faction.name !== FactionNames.VAGABOND2
    }),
  )
  const [priorityArr, setPriorityArr] = useState<number[]>([...emptyPriority])
  const [loop, setLoop] = useState<number>(0)

  useEffect(() => {
    if (priorityCompleted === true) {
      derivePriorityResults()
      navigate(`/results?type=${Methods.PRIORITY}`, { replace: false })
    }
  }, [priorityCompleted])

  const setupNextLoop = () => {
    // Save current selection
    setSelection((previousSelected: Faction[]) => {
      if (availablefactions && availablefactions.length > 0 && currentPlayer) {
        const attach: Faction[] = availablefactions
          .filter((faction) => faction.priority !== 99)
          .sort((a: Faction, b: Faction) => a.priority - b.priority)
          .map((faction) => ({
            ...faction,
            playerOwnerId: currentPlayer.id,
            priority: (loop + 1) * 10 + faction.priority,
          }))
        if (attach && attach.length > 0) {
          return [...previousSelected].concat(attach)
        }
      }
      return previousSelected
    })
    // Reset available factions
    setAvailableFactions((oldSelection: Faction[]) => {
      return oldSelection.map((faction: Faction) => ({
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

  const selectFaction = (faction: Faction) => {
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
      setAvailableFactions((oldSelection: Faction[]) => {
        const foundIdx = oldSelection.findIndex((f: Faction) => f.id === faction.id)
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
      setAvailableFactions((oldSelection: Faction[]) => {
        const foundIdx = oldSelection.findIndex((f: Faction) => f.id === faction.id)
        if (oldSelection[foundIdx].priority === 99) {
          oldSelection[foundIdx] = { ...oldSelection[foundIdx], priority: findNextemptySlotIdx }
        }
        return [...oldSelection]
      })
    } else {
      // need to un-assing to have space!
    }
  }

  const isValidPrioritySelection = (): true | React.ReactNode => {
    const hasInvalidSelection = priorityArr.filter((val: number) => {
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
      {players.length > 0 && currentPlayer && (
        <>
          <SelectionHeading
            playerName={currentPlayer.name}
            loop={loop}
            totalLoops={players.length}
            desc="select your priorities"
          />
          <ul className="faction-list">
            {availablefactions.map((faction: Faction) => (
              <FactionPriorityItem key={faction.id} faction={faction} selectFaction={selectFaction} />
            ))}
          </ul>
        </>
      )}
      {isValidPrioritySelection() === true ? (
        <SelectionFooter loop={loop} players={players} setupNextLoop={setupNextLoop} method={Methods.PRIORITY} />
      ) : (
        isValidPrioritySelection()
      )}
      <BackButton />
    </article>
  )
}
