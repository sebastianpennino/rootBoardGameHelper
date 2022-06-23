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
          <p>
            Filter the factions that <em>could</em> be assigned.
          </p>
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
            <li>
              <em>Manual Pick:</em> manually select factions
            </li>
            <li>
              <em>Truly Random:</em> randomly assign factions to each player
            </li>
            <li>
              <em>Random List:</em> selects a scenario from a pre-selected list and assigns to all players
            </li>
            <li>
              <em>Priority List:</em> each player chooses their favorites, the app does the rest
            </li>
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
      <button className="button-popover" onClick={(e) => e.stopPropagation()}>
        <BsFillInfoSquareFill />
      </button>
    </Popover>
  )
}
