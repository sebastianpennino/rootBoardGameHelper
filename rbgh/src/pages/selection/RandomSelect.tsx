import '../../css/select-page.css'
import { useContext, useEffect } from 'react'
import { Faction, FactionStates, Methods, ValidFactionStates } from '../../types'
import { allFactions as importedFactions, minReachByPlayers } from '../../data'
import { RBGHContext, RBGHStoreContent } from '../../Store'
import { SelectionFooter } from '../../components/SelectionFooter'
import { FactionFilterItem } from '../../components/FactionFilterItem'
import { BackButton } from '../../components/BackButton'

export interface RandomSelection {
  factions: Faction[]
}

export function RandomFilterSelect() {
  const {
    playerList,
    filter: factions,
    setFilter: setFactions,
    resetFilter,
    resetResults,
    deriveRandomResults,
  } = useContext<RBGHStoreContent>(RBGHContext)

  useEffect(() => {
    // on the first run reset everything
    resetFilter()
    resetResults()
    setFactions([...importedFactions])
  }, [])

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
    const targetReach = minReachByPlayers[playerList.length]
    const { selectedFactions, selectedReach } = (factions as Faction[]).reduce(
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
    if (playerList.length > selectedFactions) {
      return `Not enough available (non-blocked) factions for ${playerList.length} players`
    }
    if (selectedReach < targetReach) {
      return `Not enough available reach (${selectedReach} of ${targetReach}) in non-blocked factions for ${playerList.length} players`
    }
    return true
  }

  return (
    <article className="filter-page">
      <div className="factionSelection">
        {factions && factions.length > 0 && (
          <ul className="faction-grid">
            {(factions as Faction[]).map((faction: Faction) => (
              <FactionFilterItem
                faction={faction}
                key={faction.id}
                selectionStatus={faction.state}
                updateFaction={updateFaction}
              />
            ))}
          </ul>
        )}
        <SelectionFooter isValidSelection={isValidSelection} method={Methods.RANDOM} finalize={deriveRandomResults} />
        <BackButton />
      </div>
    </article>
  )
}
