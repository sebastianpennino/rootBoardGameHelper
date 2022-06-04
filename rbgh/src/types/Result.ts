import { RandomSelection } from '../pages/selection'
import { Faction, PickSelection } from './Faction'
import { ValidMethods } from './Method'
import { Player } from './Player'

export interface ResultEntries {
  id: number
  name: string
  faction?: Faction
}

export interface CalculationResults {
  type: ValidMethods
  seed: number
  results: ResultEntries[]
  error?: string
}

export interface CommonCalcResultsDependencies {
  players: Player[]
  seed?: number
}

export interface PrioritySelection {
  player: Player
  selection: Faction[]
}

export type ValidCalcResultOptions = RandomSelection | PickSelection | Faction[] | null
