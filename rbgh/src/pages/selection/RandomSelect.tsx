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
    [FactionStates.EXCLUDE]: 'cancelled',
    [FactionStates.INCLUDE]: 'normal',
    [FactionStates.MUST]: 'locked',
  }

  return (
    <button className={`faction-card faction-card--${classNameByStatus[selectionStatus]}`} onClick={cycleIncludeStatus}>
      <span className="faction-card__title">{faction.name}</span>
      {/* - {selectionStatus} */}
      <figure className="faction-card__image">
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
    </>
  )
}
