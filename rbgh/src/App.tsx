import './css/App.css' // Styles
import { allMethods, allVagabonds, initialPlayerList } from './data'
import { AppRoutes } from './Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { Header } from './components/Header'
import {
  Faction,
  MethodOption,
  Methods,
  Player,
  PlayerAction,
  PriorityFilter,
  PrioritySelection,
  ResultEntries,
} from './types'
import { playerReducer, RBGHContext } from './Store'
import React, { Reducer, useReducer, useState } from 'react'
import { calculatePriorityResults, calculateRandomResults, seededShuffle } from './utils'
import { useLocalStorage } from './hooks'

export const DEV_MODE = process.env.NODE_ENV === 'development'
export const MIN_PLAYABLE_PLAYERS = 3
export const MAX_PLAYERS = 6

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

    if (filter.length === playerList.length * 3) {
      console.log('ok')
    } else {
      console.log('not ok, you have a bug')
    }
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
  }

  return (
    <RBGHContext.Provider value={shareProps}>
      <div className="app">
        <Router>
          <Header />
          <main className="content">
            <AppRoutes />

            {DEV_MODE && (
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
