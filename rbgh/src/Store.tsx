import React from 'react'
import { Player, PlayerAction, PlayerReducerActionTypes } from './types'

const initialValue = {}

export const RBGHContext = React.createContext({ ...initialValue })

export const playerReducer = (state: Player[], action: PlayerAction): Player[] => {
  let id: number
  let index: number
  const MAX_PLAYERS = 6

  switch (action.type) {
    case PlayerReducerActionTypes.ADD_PLAYER:
      if (state.length < MAX_PLAYERS) {
        return [...state, { name: '', id: new Date().getTime(), show: true }]
      }
      return state
    case PlayerReducerActionTypes.HIDE_PLAYER:
      id = action.payload?.id
      index = state.findIndex((player: Player) => player.id === id)
      if (id && index !== -1 && state[index].show) {
        state[index].show = false
        return [...state]
      }
      return state
    case PlayerReducerActionTypes.UPDATE_PLAYER:
      const newName = action.payload?.name
      id = action.payload?.id
      index = state.findIndex((player: Player) => player.id === id)
      if (id && index !== -1) {
        let player = {
          ...state[index],
          name: newName,
        }
        state[index] = player
        return [...state]
      }
      return state
    case PlayerReducerActionTypes.REMOVE_PLAYER:
      id = action.payload?.id
      if (id) {
        return state.filter((player: Player) => player.id !== id)
      }
      return state
    default:
      throw new Error('unknown action!')
  }
}
