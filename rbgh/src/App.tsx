import './css/App.css' // Styles
import { allMethods, allVagabonds, initialPlayerList } from './data'
import { AppRoutes } from './Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { Header } from './components/Header'
import { Faction, MethodOption, Methods, Player, PlayerAction, ResultEntries } from './types'
import { playerReducer, RBGHContext } from './Store'
import React, { Reducer, useEffect, useReducer, useState } from 'react'
import { calculateListResults, calculatePriorityResults, calculateRandomResults, seededShuffle } from './utils'
import { usePersistReducer } from './hooks/.'

export const DEV_MODE = process.env.NODE_ENV === 'development'
export const MIN_PLAYABLE_PLAYERS = 3
export const MAX_PLAYERS = 6
export const PRIORITY_SELECTION = 7

function App() {
  // TODO: Move all of this stuff to Store.tsx

  // Player list selection
  // const [playerList, playerDispatch] = useReducer<Reducer<Player[], PlayerAction>>(playerReducer, [
  //   ...initialPlayerList,
  // ])

  // TODO: Improve typings
  const [playerList, playerDispatch] = usePersistReducer(playerReducer, [...initialPlayerList])

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
    const randomizedPlayers = seededShuffle(playerList as Player[], seed) // TODO: Improve typings
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
    const randomizedPlayers = seededShuffle(playerList as Player[], seed) // TODO: Improve typings
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
    const randomizedPlayers = seededShuffle(playerList as Player[], seed) // TODO: Improve typings
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
    if (filter.length === (playerList as Player[]).length * PRIORITY_SELECTION) {
      setPriorityCompleted(true)
    } else if (priorityCompleted) {
      setPriorityCompleted(false)
    }
  }, [filter.length, (playerList as Player[]).length, priorityCompleted]) // TODO: Improve typings

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
    // TODO: Improve typings
    // @ts-ignore
    <RBGHContext.Provider value={shareProps}>
      <Router>
        <Header />
        <main className="content">
          <AppRoutes />
        </main>
        <footer className="footer">
          Root is copyright © 2018-{new Date().getFullYear()} Patrick Leder & Leder Games (
          <a href="https://www.LederGames.com/root" rel="nofollow">
            LederGames.com/root
          </a>
          )
        </footer>
      </Router>
    </RBGHContext.Provider>
  )
}

export default App
