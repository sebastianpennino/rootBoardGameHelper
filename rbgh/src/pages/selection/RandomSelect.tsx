import { useState } from 'react'
import { Faction, Methods, ValidFactionStates } from '../../types'
import { allFactions as importedFactions } from '../../data'
import { nextStateCycle } from '../../data'
import { NavLink } from 'react-router-dom'

// Styles
import '../../css/select-page.css'

type UpdateFaction = (id: number, newState: ValidFactionStates) => void

export interface RandomSelection {
  factions: Faction[]
}

interface MyFactionButton {
  faction: Faction
  updateFaction: UpdateFaction
  selectionStatus: string
}

function FactionButton({ faction, updateFaction, selectionStatus }: MyFactionButton) {
  const cycleIncludeStatus = () => {
    const next = nextStateCycle[faction.state]
    updateFaction(faction.id, next)
  }

  return (
    <button onClick={cycleIncludeStatus}>
      {faction.name} - {selectionStatus}
      <figure className="faction-picture">
        <img src={faction.icon} alt={faction.name} />
      </figure>
    </button>
  )
}

export function FactionSelection() {
  const initialState = importedFactions

  const [factions, setFactions] = useState<Faction[]>([...initialState])

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
    // at least one is available for each player
    return true
  }

  return (
    <>
      <h3>Filter Possible Factions</h3>
      <div className="factionSelection">
        <ul>
          {factions.map((faction: Faction) => (
            <FactionButton
              key={faction.id}
              faction={faction}
              updateFaction={updateFaction}
              selectionStatus={faction.state}
            />
          ))}
        </ul>
        {isValidSelection() && (
          <NavLink to={`/results?type=${Methods.RANDOM}`} className={(n) => (n.isActive ? 'active' : '')}>
            R: Random
          </NavLink>
        )}
      </div>
    </>
  )
}
