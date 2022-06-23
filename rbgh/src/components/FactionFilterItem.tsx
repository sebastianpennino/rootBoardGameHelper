import { nextStateCycle } from '../data'
import { Faction, ValidFactionStates, FactionStates } from '../types'

type UpdateFaction = (id: number, newState: ValidFactionStates) => void

interface Props {
  faction: Faction
  updateFaction: UpdateFaction
  selectionStatus: ValidFactionStates
}

export const FactionFilterItem = (props: Props) => {
  const { faction, updateFaction, selectionStatus } = props

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
        <figure className="faction-card__image">{faction.img}</figure>
        <div className="faction-card__title">
          <h4>
            {faction.name} ({faction.reach})
          </h4>
        </div>
      </button>
    </li>
  )
}
