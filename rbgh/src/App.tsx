import './css/App.css' // Styles
import { allMethods, allVagabonds, initialPlayerList } from './data'
import { AppRoutes } from './Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { Header } from './components/Header'
import { Faction, MethodOption, Methods, Player, PlayerAction, ResultEntries } from './types'
import { playerReducer, RBGHContext } from './Store'
import React, { Reducer, useEffect, useReducer, useState } from 'react'
import { calculateListResults, calculatePriorityResults, calculateRandomResults, seededShuffle } from './utils'

export const DEV_MODE = process.env.NODE_ENV === 'development'
export const MIN_PLAYABLE_PLAYERS = 3
export const MAX_PLAYERS = 6
export const PRIORITY_SELECTION = 5

function App() {
  // Player list selection
  const [playerList, playerDispatch] = useReducer<Reducer<Player[], PlayerAction>>(playerReducer, [
    ...initialPlayerList,
  ])

  // Mark the selected method
  const [methodList, setMethodList] = useState<MethodOption[]>([...allMethods])
  // Either a list of possible factions or a selection of players with prioritized factions
  const [filter, setFilter] = useState<Faction[]>([])

  // The results after calculations to be shown
  const [result, setResult] = useState<ResultEntries[]>([])

  const [seed, setSeed] = useState<number>(new Date().getTime())

  const resetResults = () => {
    setResult([])
  }

  const resetFilter = () => {
    setFilter([])
  }

  const resetSeed = () => {
    setSeed(new Date().getTime())
  }

  const deriveRandomResults = () => {
    resetSeed()
    const randomizedPlayers = seededShuffle(playerList, seed)
    const randomizedVagabond = seededShuffle(allVagabonds, seed)
    setResult((previousResults: ResultEntries[]) => {
      const { results } = calculateRandomResults(
        {
          factions: filter as Faction[],
        },
        seed,
        {
          type: Methods.RANDOM,
          seed,
          results: [],
        },
        randomizedPlayers,
        randomizedVagabond,
      )
      if (results.length > 0) {
        return results
      }
      return previousResults
    })
  }

  const derivePriorityResults = () => {
    resetSeed()
    const randomizedPlayers = seededShuffle(playerList, seed)
    const randomizedVagabond = seededShuffle(allVagabonds, seed)

    setResult((previousResults: ResultEntries[]) => {
      const { results } = calculatePriorityResults(
        filter as Faction[],
        seed,
        {
          type: Methods.PRIORITY,
          seed,
          results: [],
        },
        randomizedPlayers,
        randomizedVagabond,
      )
      if (results.length > 0) {
        return results
      }
      return previousResults
    })
  }

  const deriveListResults = () => {
    resetSeed()
    const randomizedPlayers = seededShuffle(playerList, seed)
    const randomizedVagabond = seededShuffle(allVagabonds, seed)

    setResult((previousResults: ResultEntries[]) => {
      const { results } = calculateListResults(
        null,
        seed,
        {
          type: Methods.PRIORITY,
          seed,
          results: [],
        },
        randomizedPlayers,
        randomizedVagabond,
      )
      if (results.length > 0) {
        return results
      }
      return previousResults
    })
  }

  const [priorityCompleted, setPriorityCompleted] = useState<boolean>(false)

  useEffect(() => {
    if (filter.length === playerList.length * PRIORITY_SELECTION) {
      setPriorityCompleted(true)
    } else if (priorityCompleted) {
      setPriorityCompleted(false)
    }
  }, [filter.length, playerList.length, priorityCompleted])

  const shareProps = {
    playerList,
    playerDispatch,
    methodList,
    setMethodList,
    filter,
    setFilter,
    result,
    setResult,
    resetFilter,
    resetResults,
    deriveRandomResults,
    derivePriorityResults,
    deriveListResults,
    priorityCompleted,
  }

  return (
    <RBGHContext.Provider value={shareProps}>
      <div className="app">
        <Router>
          <Header />
          <main className="content">
            <AppRoutes />

            {DEV_MODE && false && (
              <small>
                <pre>
                  {JSON.stringify(
                    {
                      players: playerList.map((player) => player.name),
                      method: methodList.find((method) => method.selected)?.name,
                      filter,
                      result,
                    },
                    null,
                    2,
                  )}
                </pre>
              </small>
            )}
          </main>
        </Router>
      </div>
    </RBGHContext.Provider>
  )
}

export default App
