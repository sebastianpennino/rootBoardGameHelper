import { State } from 'history'
import { useCallback, useReducer } from 'react'
import { useLocalStorage } from './useLocalStorage'

const LOCAL_STORAGE_KEY = 'RBGH-LS'

// TODO: Improve typings
export const usePersistReducer = (reducer: any, initial: any) => {
  const [savedState, saveState] = useLocalStorage(LOCAL_STORAGE_KEY, initial)
  const reducerLocalStorage = useCallback(
    // give `reducerLocalStorage` the same TS API
    // as the underlying `reducer` function
    (state: any, action: any): State => {
      const newState = reducer(state, action)

      saveState(newState)

      return newState
    },
    [saveState],
  )

  return useReducer(reducerLocalStorage, savedState)
}
