import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { RBGHStoreContent, RBGHContext } from '../Store'
import { ValidMethods, Methods } from '../types'

interface Props {
  methodName?: ValidMethods
}

export const BackButton = (props: Props) => {
  const { resetFilter, resetResults } = useContext<RBGHStoreContent>(RBGHContext)
  const { methodName } = props
  let navigate = useNavigate()

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

  const backToStart = () => {
    resetFilter()
    resetResults()
    navigate('/', { replace: false })
  }

  if (
    methodName === Methods.LIST ||
    methodName === Methods.RANDOM ||
    methodName === Methods.PICK ||
    methodName === Methods.PRIORITY
  ) {
    return <></> //<div className="btn-next-container">{backButtonSwitch[methodName]()}</div>
  }
  return (
    <button className="btn-next" onClick={backToStart}>
      Back to start
    </button>
  )
}
