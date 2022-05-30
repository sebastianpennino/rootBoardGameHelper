import '../../css/select-page.css'
import { useContext, useEffect } from 'react'
import { Faction, FactionStates, ValidFactionStates } from '../../types'
import { allFactions as importedFactions, minReachByPlayers } from '../../data'
import { RBGHContext } from '../../Store'
import { SelectionFooter } from '../../components/SelectionFooter'
import { FactionFilterItem } from '../../components/FactionFilterItem'

export interface RandomSelection {
  factions: Faction[]
}

export function FactionSelection() {
  const { playerList, filter: factions, setFilter: setFactions } = useContext<any>(RBGHContext)

  useEffect(() => {
    // on the first run reset everything
    setFactions([...importedFactions])
  }, [setFactions])

  const updateFaction = (id: number, newState: ValidFactionStates) => {
    setFactions((prevState: Faction[]) => {
      const foundIdx = prevState.findIndex((faction: Faction) => faction.id === id)
      if (foundIdx !== -1) {
        const updatedFaction = {
          ...prevState[foundIdx],
          state: newState,
        }
        prevState[foundIdx] = updatedFaction
        return [...prevState]
      }
      return prevState
    })
  }

  const isValidSelection = () => {
    const playersNum = playerList.length
    const { selectedFactions, selectedReach } = factions.reduce(
      (acc: { selectedFactions: number; selectedReach: number }, faction: Faction) => {
        const add = faction.state === FactionStates.MUST || faction.state === FactionStates.INCLUDE ? 1 : 0
        const reach = add > 0 ? faction.reach : 0
        return {
          selectedFactions: acc.selectedFactions + add,
          selectedReach: acc.selectedReach + reach,
        }
      },
      { selectedFactions: 0, selectedReach: 0 },
    )
    const targetReach = minReachByPlayers[playersNum]

    if (playersNum > selectedFactions) {
      return {
        success: false,
        msg: `Error: Not enough available (non-blocked) factions for ${playersNum} players`,
      }
    }
    if (selectedReach < targetReach) {
      return {
        success: false,
        msg: `Error: Not enough available reach (${selectedReach}) in non-blocked factions for ${playersNum} players`,
      }
    }
    return {
      success: true,
    }
  }

  return (
    <article className="filter-page">
      <div className="factionSelection">
        {factions && factions.length > 0 && (
          <ul className="faction-grid">
            {factions.map((faction: Faction) => (
              <FactionFilterItem
                faction={faction}
                key={faction.id}
                selectionStatus={faction.state}
                updateFaction={updateFaction}
              />
            ))}
          </ul>
        )}
        <SelectionFooter />
      </div>
    </article>
  )
}
