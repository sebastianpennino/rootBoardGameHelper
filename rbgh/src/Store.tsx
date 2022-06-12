import React, { Dispatch, SetStateAction } from 'react'
import { Faction, MethodOption, Player, PlayerAction, PlayerReducerActionTypes, ResultEntries } from './types'

const initialValue = {
  playerList: [],
  methodList: [],
  filter: [],
  result: [],
  priorityCompleted: false,
}

export type RBGHStoreContent = {
  playerList: Player[]
  playerDispatch: Dispatch<PlayerAction>
  methodList: MethodOption[]
  setMethodList: Dispatch<SetStateAction<MethodOption[]>>
  filter: Faction[]
  setFilter: Dispatch<SetStateAction<Faction[]>>
  result: ResultEntries[]
  setResult: Dispatch<SetStateAction<ResultEntries[]>>
  resetFilter: () => void
  resetResults: () => void
  deriveRandomResults: () => void
  derivePriorityResults: () => void
  deriveListResults: () => void
  priorityCompleted: boolean
}

export const RBGHContext = React.createContext<RBGHStoreContent>({ ...initialValue } as unknown as RBGHStoreContent)

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
      id = action.payload?.id ?? 0
      index = state.findIndex((player: Player) => player.id === id)
      if (id && index !== -1 && state[index].show) {
        state[index].show = false
        return [...state]
      }
      return state
    case PlayerReducerActionTypes.UPDATE_PLAYER:
      const newName = action.payload?.name ?? ''
      id = action.payload?.id ?? 0
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
      id = action.payload?.id ?? 0
      if (id) {
        return state.filter((player: Player) => player.id !== id)
      }
      return state
    default:
      throw new Error('unknown action!')
  }
}
