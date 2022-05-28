import { PickSelection, PrioritizableFactionWithId, RandomSelection } from '../pages/selection'
import { Faction } from './Faction'
import { ValidMethods } from './Method'
import { Player } from './Player'

export interface ResultEntries {
  id: number
  name: string
  faction?: Faction | PrioritizableFactionWithId
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

export type ValidCalcResultOptions = RandomSelection | PickSelection | PrioritizableFactionWithId[] | null
