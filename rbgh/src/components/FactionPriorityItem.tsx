import { Faction } from '../types'

interface Props {
  faction: Faction
  selectFaction: (faction: Faction) => void
}

export const FactionPriorityItem = (props: Props) => {
  const { faction, selectFaction } = props
  return (
    <li
      className={`faction-item faction-priority-${faction.priority < 99 ? 'on' : 'off'} 
                  faction-color-${faction.backColor}`}
    >
      <button
        className={`faction-item-row ${faction.priority < 99 ? 'faction-item-row__hasPriority' : ''}`}
        onClick={() => {
          selectFaction(faction)
        }}
        disabled={faction.priority < 99 && false}
      >
        <figure className="faction-item-column faction-item-pic">
          <img src={faction.icon} alt={faction.name} />
        </figure>
        <div className="faction-item-column faction-item-name">
          <h4>{faction.name}</h4>
          <span>(Reach: {faction.reach})</span>
        </div>
        <div className="faction-item-column faction-item-priority circle">
          <span className="priority">{faction.priority < 99 ? faction.priority + 1 : ''}</span>
        </div>
      </button>
    </li>
  )
}
