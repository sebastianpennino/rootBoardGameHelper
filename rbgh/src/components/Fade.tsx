import React, { useEffect, useState } from 'react'

interface Props<C extends React.ElementType = React.ElementType> {
  show: boolean
  children: React.ReactNode
  callback?: (args?: any) => void
  except?: boolean
  as?: C
}

const Fade = ({ show, children, callback, except = false, as }: Props) => {
  const [render, setRender] = useState(show)
  const Component = as || 'div' // Defaults as <div>

  useEffect(() => {
    if (show) {
      setRender(true)
    }
  }, [show])

  useEffect(() => {
    if (!render && typeof callback === 'function') {
      callback()
    }
  }, [render, callback])

  const onAnimationEnd = () => {
    if (!show) {
      setRender(false)
    }
  }

  let animationText = `${show ? 'fadeIn' : 'fadeOut'} 0.5s`

  if (except) {
    animationText = 'auto'
  }

  return (
    <>
      {render && (
        <Component
          style={{
            animation: animationText,
            position: 'relative',
          }}
          onAnimationEnd={onAnimationEnd}
        >
          {children}
        </Component>
      )}
    </>
  )
}

export default Fade
