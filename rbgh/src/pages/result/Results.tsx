import { useSearchParams, NavLink } from 'react-router-dom'
import { CalculationResults, Faction, Methods, ResultEntries, ValidMethods } from '../../types'
import { calculateResultsF } from '../../utils/CalculateResults'
import { allFactions } from '../../data'
import { players } from '../../mock'

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

function ResultRow({ playerName, faction }: { playerName: string; faction: Faction }) {
  return (
    <div className="row">
      <div className="column-1">{playerName}</div>
      <div className="column-2">
        {faction.name}
        {faction.vagabondData ? `- ${faction.vagabondData}` : ''} ({faction.reach}){' '}
      </div>
    </div>
  )
}

export function Results() {
  const [searchParams] = useSearchParams()
  const methodName = searchParams.get('type') as ValidMethods

  let fakeResults: CalculationResults = { type: methodName, seed: 0, results: [] }

  fakeResults = calculateResultsF({ factions: allFactions }, { players }).calculateRandomResults()

  return (
    <div className="results-page">
      <h3>Results ({methodName})</h3>
      <div className="container">
        {fakeResults?.results.map((entry: ResultEntries) => (
          <ResultRow key={entry.id} playerName={entry.name} faction={entry.faction} />
        ))}
        {/* <small><pre>{JSON.stringify({fakeResults}, null, 2)}</pre></small> */}
      </div>
      <div>
        {methodName === Methods.RANDOM && <button>Re-roll!</button>}
        {backButtonSwitch[methodName]()}
      </div>
    </div>
  )
}
