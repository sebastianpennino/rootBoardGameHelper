import '../../css/result-page.css'
import { allFactions } from '../../data'
import { Faction, FactionNames, Methods, Player, ResultEntries, ValidMethods } from '../../types'
import { RBGHContext, RBGHStoreContent } from '../../Store'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { seededShuffle, shuffle } from '../../utils'
import { BackButton, ResultRow } from '../../components'

export function Results() {
  const { playerList, result, deriveRandomResults, derivePriorityResults } = useContext<RBGHStoreContent>(RBGHContext)
  const seed = new Date().getTime()

  const [searchParams] = useSearchParams()
  const methodName = searchParams.get('type') as ValidMethods

  const shuffledPlayers: Player[] = shuffle(playerList)
  const shuffledFactions: Faction[] = shuffle(allFactions.filter((faction) => faction.name !== FactionNames.VAGABOND2))
  const shuffledResults: ResultEntries[] = seededShuffle(result, seed)

  let fakeResults = shuffledPlayers.map((player: Player, idx: number) => ({
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

  const handleReroll = () => {
    if (methodName === Methods.RANDOM) {
      deriveRandomResults()
    }
    if (methodName === Methods.PRIORITY) {
      derivePriorityResults()
    }
  }

  return (
    <article className="results-page">
      <h3>Faction and player:</h3>
      <ul className="container">
        {shuffledResults?.map((entry: ResultEntries) => (
          <ResultRow key={entry.id} playerName={entry.name} playerId={entry.id} faction={entry.faction} />
        ))}
      </ul>
      {methodName !== Methods.LIST && <BackButton methodName={methodName} />}
      <BackButton />
      {(methodName === Methods.RANDOM || methodName === Methods.PRIORITY || methodName === Methods.LIST) && (
        <button className="btn-next" onClick={handleReroll}>
          Re-roll results
        </button>
      )}
    </article>
  )
}
