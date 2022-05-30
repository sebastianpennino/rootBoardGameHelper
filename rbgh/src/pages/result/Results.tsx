import '../../css/result-page.css'
import { allFactions } from '../../data'
import { CalculationResults, Faction, FactionNames, Methods, Player, ResultEntries, ValidMethods } from '../../types'
import { RBGHContext } from '../../Store'
import { useContext } from 'react'
import { useSearchParams, NavLink } from 'react-router-dom'
import { seededShuffle, shuffle } from '../../utils'

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

function ResultRow({ playerName, faction, playerId }: { playerName: string; playerId: number; faction?: Faction }) {
  return (
    <div className="row">
      <div className="column-1">
        {playerName} (ID: {playerId})
      </div>
      <div className="column-2">
        {faction?.name}
        {faction?.vagabondData ? `- ${faction?.vagabondData}` : ''} ({faction?.reach}){' '}
      </div>
    </div>
  )
}

interface IBackButton {
  methodName: ValidMethods | string
}
const BackButton = ({ methodName }: IBackButton) => {
  if (
    methodName === Methods.LIST ||
    methodName === Methods.RANDOM ||
    methodName === Methods.PICK ||
    methodName === Methods.PRIORITY
  ) {
    return backButtonSwitch[methodName]()
  }
  return <NavLink to="/">Back to start</NavLink>
}

export function Results() {
  const { playerList } = useContext<any>(RBGHContext)

  const [searchParams] = useSearchParams()
  const methodName = searchParams.get('type') as ValidMethods

  const shuffledPlayers: Player[] = shuffle(playerList)
  const shuffledFactions: Faction[] = shuffle(allFactions.filter((faction) => faction.name !== FactionNames.VAGABOND2))

  const fakeResults = shuffledPlayers.map((player: Player, idx: number) => ({
    id: player.id,
    name: player.name,
    faction: shuffledFactions[idx],
  }))

  /**
   * HERE A BIG SWITCH WILL RUN BASED ON THE CURRENT METHOD
   * A GOOD UX INCLUDES A SMALL FAKE LOADING TIME, TO REPRESENT CALCULATION
   *
   * 1) MANUAL PICK --> JUST SHOW THE RESULTS
   * 2) LIST --> USE THE PLAYER NUMBER TO PICK A LIST > REROLL POSSIBLE
   * 3) RANDOM --> USE THE FILTER TO CALCULATE RESULTS > REROLL POSSIBLE
   * 4) PRIORITY --> USE THE FILTER TO CALCULATE RESULTS
   */

  // fakeResults = calculateResultsF({
  //   opts: { factions: allFactions },
  //   deps: { players, seed: 55 },
  // }).calculateRandomResults()
  // fakeResults = calculateResultsF({ opts: testData, deps: { players, seed: 55 } }).calculatePriorityResults()
  // fakeResults = calculateResultsF({ opts: null, deps: { players, seed: 55 } }).calculateRandomResultsList()
  //fakeResults = calculateResultsF({ opts: { results: r }, deps: { players, seed: 55 } }).calculatePickResults()

  return (
    <article className="results-page">
      <h3>Faction and player:</h3>
      <div className="container">
        {fakeResults?.map((entry: ResultEntries) => (
          <ResultRow key={entry.id} playerName={entry.name} playerId={entry.id} faction={entry.faction} />
        ))}
      </div>
      <div>
        {(methodName === Methods.RANDOM || methodName === Methods.LIST) && <button>Re-roll results</button>}
        <BackButton methodName={methodName} />
      </div>
      <pre>{JSON.stringify({ fakeResults }, null, 2)}</pre>
    </article>
  )
}
