import { seededShuffle } from '.'
import { generateFactions } from '../data'
import { TwoPlayerList, ThreePlayerList, FourPlayerList, FivePlayerList, SixPlayerList } from '../data/FactionList'
import {
  CalculationResults,
  Faction,
  FactionNames as F,
  Player,
  ResultEntries,
  ValidFactions,
  ValidVagabonds,
} from '../types'

const recommendedList = [TwoPlayerList, ThreePlayerList, FourPlayerList, FivePlayerList, SixPlayerList]

export const calculateListResults = (
  opts: null,
  seed: number,
  response: CalculationResults,
  randomizedPlayers: Player[],
  randomizedVagabond: ValidVagabonds[],
): CalculationResults => {
  const numOfPlayers = randomizedPlayers.length

  if (numOfPlayers > 1) {
    const pickList = recommendedList[numOfPlayers - 2] as Array<ValidFactions[]>
    const pickFirstArray: ValidFactions[] = seededShuffle(pickList, seed)[0]
    const generated: Faction[] = generateFactions(pickFirstArray)
    const replacementArr: Faction[] = seededShuffle(generateFactions([F.KEEPERS_IN_IRON, F.LORD_OF_THE_HUNDREDS]), seed)

    // Possible replacement 50% for each faction bigger than 7 reach
    const factionsArr: Faction[] = generated.map((faction: Faction) => {
      let copy = faction
      if (replacementArr.length > 0 && (faction.reach === 7 || faction.reach === 8) && Math.random() < 0.5) {
        copy = replacementArr.pop() as Faction
      }
      return copy
    })

    const results: ResultEntries[] = randomizedPlayers.map((player: Player, idx: number) => {
      const match = factionsArr[idx]
      if (match.name === F.VAGABOND1 || match.name === F.VAGABOND2) {
        match.vagabondData = randomizedVagabond[match.reach > 2 ? 0 : 1]
      }
      return {
        id: player.id,
        name: player.name,
        faction: match,
      }
    })

    return { ...response, results }
  }

  return { ...response, error: 'At least 2 players must be selected' }
}
