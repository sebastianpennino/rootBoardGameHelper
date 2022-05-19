import { useSearchParams, NavLink } from 'react-router-dom'
import { Faction, Methods, Player, ValidMethods } from '../../types'
import { fakeResults } from '../../mock'

// Styles
import '../../css/result-page.css'

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
}

function ResultRow({ player, selection }: { player: Player; selection: Faction }) {
  return (
    <div className="row">
      <div className="column-1">{player.name}</div>
      <div className="column-2">{selection.name}</div>
    </div>
  )
}

export function Results() {
  const [searchParams] = useSearchParams()
  const methodName = searchParams.get('type') as ValidMethods

  return (
    <div className="results-page">
      <h3>Results ({methodName})</h3>
      <div className="container">
        {fakeResults.results.map((entry: any) => (
          <ResultRow key={entry.id} player={entry.player} selection={entry.selection} />
        ))}
      </div>
      <div>
        {methodName === Methods.RANDOM && <button>Re-roll!</button>}
        {backButtonSwitch[methodName]()}
      </div>
    </div>
  )
}
