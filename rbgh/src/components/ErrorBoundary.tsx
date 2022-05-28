import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log('[SEBAS]: ', error, errorInfo)
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h3>Something went wrong! </h3>
          <pre>{JSON.stringify({ state: this.state }, null, 2)}</pre>
        </>
      )
    }
    // @ts-ignore
    return this.props.children
  }
}
