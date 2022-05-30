/**
 * Player reducer
 */

export enum PlayerReducerActionTypes {
  ADD_PLAYER = 'ADD_PLAYER',
  HIDE_PLAYER = 'HIDE_PLAYER',
  REMOVE_PLAYER = 'REMOVE_PLAYER',
  UPDATE_PLAYER = 'UPDATE_PLAYER',
}

export type ValidPlayerReducerActionTypes =
  | PlayerReducerActionTypes.ADD_PLAYER
  | PlayerReducerActionTypes.HIDE_PLAYER
  | PlayerReducerActionTypes.REMOVE_PLAYER
  | PlayerReducerActionTypes.UPDATE_PLAYER

export interface PlayerAction {
  type: ValidPlayerReducerActionTypes
  payload: { id: number; name: string }
}

/**
 * Priority Selection reducer
 */
