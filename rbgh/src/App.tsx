import './css/App.css' // Styles
import { allMethods } from './data'
import { AppRoutes } from './Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { Header } from './components/Header'
import { MethodOption, Player, PlayerAction } from './types'
import { playerReducer, RBGHContext } from './Store'
import React, { Reducer, useReducer, useState } from 'react'

export const DEVELOPMENT_MODE = process.env.NODE_ENV === 'development'
export const MIN_PLAYABLE_PLAYERS = 3
export const MAX_PLAYERS = 6

const initialPlayerList = [
  {
    name: 'One',
    id: 1,
    show: true,
  },
  {
    name: 'Two',
    id: 2,
    show: true,
  },
  {
    name: 'Three',
    id: 3,
    show: true,
  },
]

function App() {
  const [playerList, playerDispatch] = useReducer<Reducer<Player[], PlayerAction>>(playerReducer, [
    ...initialPlayerList,
  ])
  const [methodList, setMethodList] = useState<MethodOption[]>([...allMethods])

  const passProps = {
    playerList,
    playerDispatch,
    methodList,
    setMethodList,
  }

  return (
    <RBGHContext.Provider value={passProps}>
      <div className="app">
        <Router>
          <Header />
          <main className="content">
            <AppRoutes />

            {DEVELOPMENT_MODE && (
              <small>
                <pre>
                  {JSON.stringify(
                    {
                      playerList: playerList.map((player) => player.name),
                      selectedMethod: methodList.find((method) => method.selected)?.name,
                      filter: null, // Only for RANDOM and PRIORITY (LIST just uses the playerList.length)
                      results: [], // Generated at results page (except for MANUAL PICK that generates that manually)
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
