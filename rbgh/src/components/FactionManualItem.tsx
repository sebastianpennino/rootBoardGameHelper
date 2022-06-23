import { Faction } from '../types'

interface Props {
  faction: Faction
  selectFaction: (faction: Faction, flag: boolean) => void
}

export const FactionManualItem = (props: Props) => {
  const { faction, selectFaction } = props
  return (
    <li className="faction-card">
      <button
        className={`btn btn__grow-ellipse ${faction.selected ? 'selected' : ''}`}
        style={{ borderColor: `${faction.backColor}`, backgroundColor: `${faction.backColor}` }}
        onClick={() => {
          selectFaction(faction, true)
        }}
      >
        <figure className="faction-picture">{faction.img}</figure>
      </button>
    </li>
  )
}
