import React, { Reducer, useReducer } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './Routes'
import { Header } from './components/Header'
import { Player } from './types'
import RBGHContext from './RBGHContext'
// Styles
import './css/App.css'

const initialPlayerList = [
  {
    name: 'RenameMe',
    id: 1,
    show: true,
  },
]

export interface PlayerAction {
  type: ValidPlayerReducerActionTypes
  payload: { id: number; name: string }
}

export enum PlayerReducerActionTypes {
  ADD_PLAYER = 'ADD_PLAYER',
  HIDE_PLAYER = 'HIDE_PLAYER',
  UPDATE_PLAYER = 'UPDATE_PLAYER',
  REMOVE_PLAYER = 'REMOVE_PLAYER',
}

export type ValidPlayerReducerActionTypes =
  | PlayerReducerActionTypes.ADD_PLAYER
  | PlayerReducerActionTypes.HIDE_PLAYER
  | PlayerReducerActionTypes.REMOVE_PLAYER
  | PlayerReducerActionTypes.UPDATE_PLAYER

const playerReducer = (state: Player[], action: PlayerAction): Player[] => {
  let id: number
  let index: number
  const MAX_PLAYERS = 6

  switch (action.type) {
    case PlayerReducerActionTypes.ADD_PLAYER:
      if (state.length < MAX_PLAYERS) {
        console.log(`Running playerReducer, final state is:`, { state, action })
        return [...state, { name: '', id: new Date().getTime(), show: true }]
      }
      return state
    case PlayerReducerActionTypes.HIDE_PLAYER:
      id = action.payload?.id
      index = state.findIndex((player: Player) => player.id === id)
      if (id && index !== -1 && state[index].show) {
        state[index].show = false
        console.log(`Running playerReducer, final state is:`, { state, action })
        return [...state]
      }
      return state
    case PlayerReducerActionTypes.UPDATE_PLAYER:
      const newName = action.payload?.name
      id = action.payload.id
      index = state.findIndex((player: Player) => player.id === id)
      if (id && index !== -1) {
        let player = {
          ...state[index],
          name: newName,
        }
        state[index] = player
        console.log(`Running playerReducer, final state is:`, { state, action })
        return [...state]
      }
      return state
    case PlayerReducerActionTypes.REMOVE_PLAYER:
      id = action.payload?.id
      if (id) {
        console.log(`Running playerReducer, final state is:`, { state, action })
        return state.filter((player: Player) => player.id !== id)
      }
      return state
    default:
      throw new Error('unknown action!')
  }
}

function App() {
  const [playerList, playerDispatch] = useReducer<Reducer<Player[], PlayerAction>>(playerReducer, [
    ...initialPlayerList,
  ])

  const passProps = {
    playerList,
    playerDispatch,
  }

  return (
    <RBGHContext.Provider value={passProps}>
      <div className="rbgh">
        <Router>
          <Header />
          <main className="content">
            <AppRoutes />
          </main>
        </Router>
      </div>
    </RBGHContext.Provider>
  )
}

export default App
