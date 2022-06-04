import { useNavigate } from 'react-router-dom'
import { Methods, Player } from '../types'

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
  finalize: () => void
}

export const SelectionFooter = (props: PropsPickPriority | PropsRandomFilter) => {
  const { method, finalize } = props
  const navigate = useNavigate()

  switch (method) {
    case Methods.RANDOM:
      const { isValidSelection } = props
      const handleFinalize = () => {
        finalize()
        navigate(`/results?type=${method}`, { replace: false })
      }
      return (
        <>
          {isValidSelection() === true ? (
            <button className="btn-next" onClick={handleFinalize}>
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
            <button className="btn-next" onClick={setupNextLoop}>
              Save & Finalize
            </button>
          )}
        </>
      )
  }
}
