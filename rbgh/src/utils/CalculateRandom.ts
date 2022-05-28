import { RandomSelection } from '../pages/selection'
import {
  CalculationResults,
  Player,
  ValidVagabonds,
  Faction,
  FactionStates,
  ResultEntries,
  FactionNames,
} from '../types'
import { seededShuffle } from './Shuffle'

export const calculateRandomResults = (
  opts: RandomSelection,
  seed: number,
  response: CalculationResults,
  randomizedPlayers: Player[],
  randomizedVagabond: ValidVagabonds[],
): CalculationResults => {
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
      if (faction.name === FactionNames.VAGABOND1 || faction.name === FactionNames.VAGABOND2) {
        faction.vagabondData = randomizedVagabond[faction.reach > 2 ? 0 : 1]
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
