import './css/App.css' // Styles
import { allMethods, initialPlayerList } from './data'
import { AppRoutes } from './Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { Header } from './components/Header'
import { MethodOption, Player, PlayerAction, PrioritySelection, ResultEntries } from './types'
import { playerReducer, RBGHContext } from './Store'
import React, { Reducer, useReducer, useState } from 'react'

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
  const [filter, setFilter] = useState<PrioritySelection[]>([])
  // The results after calculations to be shown
  const [result, setResult] = useState<ResultEntries[]>([])

  const shareProps = {
    playerList,
    playerDispatch,
    methodList,
    setMethodList,
    filter,
    setFilter,
    result,
    setResult,
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
                      playerList: playerList.map((player) => player.name),
                      selectedMethod: methodList.find((method) => method.selected)?.name,
                      filter,
                      result, // Generated at results page (except for MANUAL PICK that generates that manually)
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
