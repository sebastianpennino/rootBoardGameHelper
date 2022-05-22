import { useState } from 'react'
import { Faction, FactionStates, Methods, ValidFactionStates } from '../../types'
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
  selectionStatus: ValidFactionStates
}

function FactionButton({ faction, updateFaction, selectionStatus }: MyFactionButton) {
  const cycleIncludeStatus = () => {
    const next = nextStateCycle[faction.state]
    updateFaction(faction.id, next)
  }

  const classNameByStatus: Record<ValidFactionStates, string> = {
    [FactionStates.EXCLUDE]: 'exclude',
    [FactionStates.INCLUDE]: 'include',
    [FactionStates.MUST]: 'must',
  }

  return (
    <li className={`faction-card faction-card--${classNameByStatus[selectionStatus]}`}>
      <button onClick={cycleIncludeStatus}>
        <figure className="faction-card__image">
          <img src={faction.icon} alt={faction.name} />
        </figure>
        <div className="faction-card__title">
          <h4>{faction.name}</h4>
        </div>
        {/* - {selectionStatus} */}
      </button>
    </li>
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
    <div className="random-page">
      <h3>Filter Possible Factions</h3>
      <div className="factionSelection">
        <ul className="faction-grid">
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
    </div>
  )
}
