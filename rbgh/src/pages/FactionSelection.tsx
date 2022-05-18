import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Faction as MyFaction } from '../types'
import { factions as importedFactions } from '../mock'
import '../css/FactionSelection.css'

type UpdateFaction = (id: number, newState: string) => void

interface MyFactionButton {
  faction: MyFaction
  updateFaction: UpdateFaction
  selectionStatus: string
}

function FactionButton({ faction, updateFaction, selectionStatus }: MyFactionButton) {
  const nextState: Record<string, string> = {
    include: 'must',
    must: 'exclude',
    exclude: 'include',
  }

  const cycleIncludeStatus = () => {
    const next = nextState[faction.state]
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

  const [factions, setFactions] = useState<MyFaction[]>([...initialState])

  const updateFaction = (id: number, newState: string) => {
    setFactions((prevState: MyFaction[]) => {
      const foundIdx = prevState.findIndex((faction: MyFaction) => faction.id === id)
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
    /*
      selectable factions >= players
    */
    return factions.length > 3
  }

  return (
    <>
      <div className="methodSelection">
        <select
          name="methodSelection"
          onChange={(e) => {
            const val = e.target.value
            console.log(val)
          }}
        >
          <option value="random">Random</option>
          <option value="pick">Manual</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="subMethodSelection">
        <select
          name="methodSelection"
          onChange={(e) => {
            const val = e.target.value
            console.log(val)
          }}
        >
          <option value="random">Truly Random</option>
          <option value="pick">Recommended List</option>
        </select>
      </div>
      <div className="factionSelection">
        <ul>
          {factions.map((faction: MyFaction) => (
            <FactionButton
              key={faction.id}
              faction={faction}
              updateFaction={updateFaction}
              selectionStatus={faction.state}
            />
          ))}
        </ul>
      </div>
      {isValidSelection() && (
        <NavLink to="/step3" className={(n: any) => (n.isActive ? 'active' : '')}>
          next step
        </NavLink>
      )}
    </>
  )
}
