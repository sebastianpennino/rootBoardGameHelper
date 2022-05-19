import { useLocation } from 'react-router-dom'

// Styles
import '../css/no-match-page.css'

export function NoMatch() {
  let location = useLocation()

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
      <pre>
        <code>Debug: {JSON.stringify({ location }, null, 2)}</code>
      </pre>
    </div>
  )
}
