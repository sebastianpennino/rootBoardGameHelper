import { NavLink } from 'react-router-dom'
import { ValidMethods, Methods } from '../types'

interface Props {
  methodName?: ValidMethods
}

export const BackButton = (props: Props) => {
  const { methodName } = props

  const backButtonSwitch = {
    [Methods.PRIORITY]: () => {
      return <NavLink to="/priority-select">Back to Priority</NavLink>
    },
    [Methods.PICK]: () => {
      return <NavLink to="/manual-select">Back to Pick</NavLink>
    },
    [Methods.RANDOM]: () => {
      return <NavLink to="/faction-selection">Back to Faction Selection</NavLink>
    },
    [Methods.LIST]: () => {
      return <NavLink to="/">Back to start</NavLink>
    },
  }

  if (
    methodName === Methods.LIST ||
    methodName === Methods.RANDOM ||
    methodName === Methods.PICK ||
    methodName === Methods.PRIORITY
  ) {
    return <div className="btn-next-container">{backButtonSwitch[methodName]()}</div>
  }
  return (
    <div className="btn-next-container">
      <NavLink to="/">Back to start</NavLink>
    </div>
  )
}
