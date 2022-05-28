import { PrioritizableFactionWithId } from '../pages/selection'
import { CalculationResults, Player, ValidVagabonds, ResultEntries, FactionNames } from '../types'

export const calculatePriorityResults = (
  opts: PrioritizableFactionWithId[],
  seed: number,
  response: CalculationResults,
  randomizedPlayers: Player[],
  randomizedVagabond: ValidVagabonds[],
): CalculationResults => {
  const input = opts as PrioritizableFactionWithId[]
  const finalFactions: PrioritizableFactionWithId[] = input.reduce(
    (acc: PrioritizableFactionWithId[], current: PrioritizableFactionWithId) => {
      if (acc.length === randomizedPlayers.length) return acc // We already finished but there's no break in reduce
      const check =
        acc.length > 0 &&
        acc.some((faction: PrioritizableFactionWithId) => {
          return faction.id === current.id || faction.playerOwnerId === current.playerOwnerId
        })
      if (!check) {
        acc.push(current)
      }
      return acc
    },
    [],
  )
  const results: ResultEntries[] = randomizedPlayers.map((player: Player) => {
    const match = finalFactions.find((faction: PrioritizableFactionWithId) => faction.playerOwnerId === player.id)
    if (match && (match.name === FactionNames.VAGABOND1 || match.name === FactionNames.VAGABOND2)) {
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
