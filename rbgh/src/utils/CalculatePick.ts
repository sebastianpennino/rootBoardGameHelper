import { PickSelection } from '../pages/selection'
import { CalculationResults, ValidVagabonds, ResultEntries, FactionNames } from '../types'
import { seededShuffle } from './Shuffle'

export const calculatePickResults = (
  opts: PickSelection,
  seed: number,
  response: CalculationResults,
  randomizedVagabond: ValidVagabonds[],
): CalculationResults => {
  const input = seededShuffle((opts as PickSelection).results, seed)
  const results = input.map((entry: ResultEntries) => {
    const faction = entry.faction
    if (faction?.name === FactionNames.VAGABOND1) {
      faction.vagabondData = randomizedVagabond[0]
    } else if (faction?.name === FactionNames.VAGABOND2) {
      faction.vagabondData = randomizedVagabond[1]
    }
    return entry
  })
  return { ...response, results }
}
