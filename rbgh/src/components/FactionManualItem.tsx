import { SelectableFaction } from '../pages/selection'

interface Props {
  faction: SelectableFaction
  selectFaction: (faction: SelectableFaction, flag: boolean) => void
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
        <figure className="faction-picture">
          <img src={faction.icon} alt={faction.name} />
        </figure>
      </button>
    </li>
  )
}
