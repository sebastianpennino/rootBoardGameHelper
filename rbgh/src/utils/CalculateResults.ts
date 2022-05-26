import { allVagabonds } from '../data'
import { RandomSelection, PickSelection, PrioritySelection } from '../pages/selection'
import {
  CalculationResults,
  CommonCalcResultsDependencies,
  Faction,
  FactionNames,
  FactionStates,
  Methods,
  Player,
  ResultEntries,
  ValidCalcResultOptions,
  ValidMethods,
} from '../types'
import { seededShuffle } from './Shuffle'

const calcResultsF = (opts: ValidCalcResultOptions, deps: CommonCalcResultsDependencies, type: ValidMethods) => {
  const seed = deps.seed || new Date().getTime()
  const response: CalculationResults = {
    type,
    seed,
    results: [],
  }
  const randomizedPlayers = seededShuffle(deps.players, seed)
  const randomizedVagabond = seededShuffle(allVagabonds, seed)

  console.log('3 ok')

  switch (type) {
    case Methods.RANDOM:
      console.log('flavor random')

      return function calculateRandomResults(): CalculationResults {
        const shuffledFactions = seededShuffle((opts as RandomSelection).factions, seed)
        const required = shuffledFactions.filter((faction: Faction) => {
          return faction.state === FactionStates.MUST
        })
        const included = shuffledFactions.filter((faction: Faction) => {
          return faction.state === FactionStates.INCLUDE
        })

        if (required.length + included.length > randomizedPlayers.length) {
          const results: ResultEntries[] = randomizedPlayers.map((player: Player) => {
            const faction = (required.pop() || included.pop()) ?? shuffledFactions[0]
            if (faction.name === FactionNames.VAGABOND1) {
              faction.vagabondData = randomizedVagabond[0]
            } else if (faction.name === FactionNames.VAGABOND2) {
              faction.vagabondData = randomizedVagabond[1]
            }
            return {
              id: player.id,
              name: player.name,
              faction,
            }
          })
          return { ...response, results }
        }

        return { ...response, error: `Too many excluded factions for ${randomizedPlayers.length} players` }
      }

    case Methods.PICK:
      console.log('flavor pick')
      return function calculatePicks(): CalculationResults {
        return { ...response, results: (opts as PickSelection).results }
      }
    case Methods.PRIORITY:
      console.log('flavor priority')
      return function calculatePriorities(): CalculationResults {
        const input = opts as PrioritySelection[]

        return response
      }
    default:
      return (): CalculationResults => {
        return { ...response, error: 'Something went wrong' }
      }
  }
}

export const calculateResultsF = (opts: ValidCalcResultOptions, deps: CommonCalcResultsDependencies) => ({
  calculateRandomResults: calcResultsF(opts, deps, Methods.RANDOM),
  calculateRandomResultsList: calcResultsF(opts, deps, Methods.RANDOM),
  calculatePickResults: calcResultsF(opts, deps, Methods.PICK),
  calculatePriorityResults: calcResultsF(opts, deps, Methods.PRIORITY),
})
