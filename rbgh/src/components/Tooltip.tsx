import { BsFillInfoSquareFill } from 'react-icons/bs'
import { PRIORITY_SELECTION } from '../App'
import { Popover } from './Popover'

export enum InfoPopOvers {
  GENERAL = 'GENERAL',
  FILTER_FACTIONS = 'FILTER_FACTIONS',
  PICK_FACTIONS = 'PICK_FACTIONS',
  PRIORITIZE_FACTIONS = 'PRIORITIZE_FACTIONS',
}

export type ValidPopOvers =
  | InfoPopOvers.GENERAL
  | InfoPopOvers.FILTER_FACTIONS
  | InfoPopOvers.PICK_FACTIONS
  | InfoPopOvers.PRIORITIZE_FACTIONS

const renderSwitch = (text: ValidPopOvers) => {
  switch (text) {
    case InfoPopOvers.FILTER_FACTIONS:
      return (
        <>
          <p>Filter the factions that could be assigned.</p>
          <p>
            A ❤️ means that a faction <em>must</em> be included if able.
          </p>
        </>
      )
    case InfoPopOvers.PICK_FACTIONS:
      return (
        <p>
          Manually choose a faction (this method does not guarantee that the provided selection has the minimum reach).
        </p>
      )
    case InfoPopOvers.PRIORITIZE_FACTIONS:
      return <p>Each player numbers factions 1 to {PRIORITY_SELECTION} and the app handles any ties</p>
    default:
      return (
        <>
          <p>Choose a method of selection:</p>
          <ul className="help-method-list">
            <li>Manual Pick: Manually select factions</li>
            <li>Truly Random: Randomly select assign factions to each player</li>
            <li>Random List: Selects from a preselected list based on the number of players</li>
            <li>Priority List: Each player chooses their favorites, the app does the rest</li>
          </ul>
        </>
      )
  }
}

interface TooltipProps {
  text: ValidPopOvers
}

export const MyTooltip = ({ text }: TooltipProps) => {
  return (
    <Popover
      render={({ close }) => (
        <div className="text">
          {renderSwitch(text)}
          <button onClick={close}>Close</button>
        </div>
      )}
    >
      <button className="button-popover">
        <BsFillInfoSquareFill />
      </button>
    </Popover>
  )
}
