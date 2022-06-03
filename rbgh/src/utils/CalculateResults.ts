import { allVagabonds } from '../data'
import {
  calculateListResults,
  calculatePickResults,
  calculatePriorityResults,
  calculateRandomResults,
  seededShuffle,
} from './'
import { RandomSelection, PickSelection } from '../pages/selection'
import {
  CalculationResults,
  CommonCalcResultsDependencies,
  Methods,
  Faction,
  ValidCalcResultOptions,
  ValidMethods,
} from '../types'

const calcResultsF = (opts: ValidCalcResultOptions, deps: CommonCalcResultsDependencies, type: ValidMethods): any => {
  const seed = deps.seed || new Date().getTime()
  const response: CalculationResults = {
    type,
    seed,
    results: [],
  }
  const randomizedPlayers = seededShuffle(deps.players, seed)
  const randomizedVagabond = seededShuffle(allVagabonds, seed)

  switch (type) {
    case Methods.LIST:
      return calculateListResults(opts as null, seed, response, randomizedPlayers, randomizedVagabond)

    case Methods.PICK:
      return calculatePickResults(opts as PickSelection, seed, response, randomizedVagabond)

    case Methods.PRIORITY:
      return calculatePriorityResults(opts as Faction[], seed, response, randomizedPlayers, randomizedVagabond)

    case Methods.RANDOM:
      return calculateRandomResults(opts as RandomSelection, seed, response, randomizedPlayers, randomizedVagabond)

    default:
      break
  }

  return () => {
    return { ...response, error: 'Something went wrong' }
  }
}

interface CalcResultFactory {
  opts: ValidCalcResultOptions
  deps: CommonCalcResultsDependencies
}

type CalcResultsFunction = () => CalculationResults

export const calculateResultsF2 = ({ opts, deps }: CalcResultFactory): Record<string, any> => ({
  calculateRandomResults: calcResultsF(opts, deps, Methods.RANDOM),
  calculateRandomResultsList: calcResultsF(opts, deps, Methods.LIST),
  calculatePickResults: calcResultsF(opts, deps, Methods.PICK),
  calculatePriorityResults: calcResultsF(opts, deps, Methods.PRIORITY),
})

export const calculateResultsF = () => {
  return
}
