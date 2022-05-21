import { PickSelection, PrioritySelection, RandomSelection } from '../pages/selection'
import { Faction } from './Faction'
import { ValidMethods, ValidSubRandomMethods } from './Method'
import { Player } from './Player'

export interface ResultEntries {
  id: number
  name: string
  faction: Faction
}

export interface CalculationResults {
  type: ValidMethods
  subType?: ValidSubRandomMethods
  seed: number
  results: ResultEntries[]
  error?: string
}

export interface CommonCalcResultsDependencies {
  players: Player[]
  seed?: number
}

export type ValidCalcResultOptions = RandomSelection | PickSelection | PrioritySelection
