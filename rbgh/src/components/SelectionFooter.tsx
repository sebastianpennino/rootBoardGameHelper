import { useNavigate } from 'react-router-dom'
import { Methods, Player, ValidMethods } from '../types'

interface PropsPickPriority {
  method: Methods.PICK | Methods.PRIORITY
  loop: number
  players: Player[]
  setupNextLoop: () => void
  requirements?: string
  disabled?: boolean
  finalize?: () => void
}

interface PropsRandomFilter {
  method: Methods.RANDOM
  isValidSelection: () => true | string
  finalize?: () => void
}

export const SelectionFooter = (props: PropsPickPriority | PropsRandomFilter) => {
  let navigate = useNavigate()
  const { method, finalize } = props

  const goToResults = (method: ValidMethods) => {
    return navigate(`/results?type=${method}`, { replace: false })
  }

  const finalLoop = async () => {
    if (typeof finalize === 'function') {
      await finalize()
    }
    goToResults(method)
  }

  switch (method) {
    case Methods.RANDOM:
      const { isValidSelection } = props
      return (
        <>
          {isValidSelection() === true ? (
            <button className="btn-next" onClick={finalLoop}>
              Finalize
            </button>
          ) : (
            <>Error: {isValidSelection()}</>
          )}
        </>
      )
    default:
      const { loop, players, setupNextLoop, disabled = false } = props
      return (
        <>
          {loop < players.length - 1 ? (
            <button className="btn-next" onClick={setupNextLoop} disabled={disabled}>
              Save & Continue
            </button>
          ) : (
            <button className="btn-next" onClick={finalLoop}>
              Save & Finalize
            </button>
          )}
        </>
      )
  }
}
