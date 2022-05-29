import { IconContext } from 'react-icons'

interface MethodItemProps {
  method: any
  idx: number
  selectMethod: any
}

export const MethodItem = ({ method, idx, selectMethod }: MethodItemProps) => {
  return (
    <IconContext.Provider value={{ color: '#ff4a56', size: '3em' }}>
      <li key={method.name} className="method-list-item">
        <button
          className={`method-list-item-button btn btn__slide-from-left ${method.selected ? 'selected' : ''}`}
          onClick={() => {
            selectMethod(method.id)
          }}
          tabIndex={idx + 1}
        >
          <figure className="method-picture">{method.icon()}</figure>
          <span>{method.desc}</span>
        </button>
      </li>
    </IconContext.Provider>
  )
}
