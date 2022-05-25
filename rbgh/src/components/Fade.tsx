import React, { useEffect, useState } from 'react'

interface Props {
  show: boolean
  children: React.ReactNode
  callback?: (args?: any) => void
}

const Fade = ({ show, children, callback }: Props) => {
  const [render, setRender] = useState(show)

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

  return (
    <>
      {render && (
        <div
          style={{
            animation: `${show ? 'fadeIn' : 'fadeOut'} 0.5s`,
            position: 'relative',
          }}
          onAnimationEnd={onAnimationEnd}
        >
          {children}
        </div>
      )}
    </>
  )
}

export default Fade
