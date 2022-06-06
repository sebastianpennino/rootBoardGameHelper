import '../../css/result-page.css'
import { Methods, ResultEntries, ValidMethods } from '../../types'
import { RBGHContext, RBGHStoreContent } from '../../Store'
import { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { seededShuffle } from '../../utils'
import { BackButton, ResultRow } from '../../components'
import { minReachByPlayers } from '../../data'

export function Results() {
  const { playerList, result, deriveRandomResults, derivePriorityResults, deriveListResults } =
    useContext<RBGHStoreContent>(RBGHContext)
  const seed = new Date().getTime()

  const [searchParams] = useSearchParams()
  const methodName = searchParams.get('type') as ValidMethods
  const shuffledResults: ResultEntries[] = seededShuffle(result, seed)

  const handleReroll = () => {
    if (methodName === Methods.RANDOM) {
      deriveRandomResults()
    }
    if (methodName === Methods.PRIORITY) {
      derivePriorityResults()
    }
    if (methodName === Methods.LIST) {
      deriveListResults()
    }
  }

  useEffect(() => {
    if (methodName === Methods.LIST) {
      deriveListResults()
    }
  }, [methodName])

  const calculateReach = (): number => {
    return shuffledResults.reduce((acc, entry: ResultEntries) => {
      return acc + (entry.faction?.reach ?? 0)
    }, 0)
  }

  return (
    <article className="results-page">
      <ul className="container">
        {shuffledResults?.map((entry: ResultEntries) => (
          <ResultRow key={entry.id} playerName={entry.name} playerId={entry.id} faction={entry.faction} />
        ))}
      </ul>
      <div className="total-reach">
        Total Reach: {calculateReach()} (Recommended {minReachByPlayers[shuffledResults.length]})
      </div>
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
