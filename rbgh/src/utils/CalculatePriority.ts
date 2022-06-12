import { CalculationResults, Player, ValidVagabonds, ResultEntries, FactionNames, Faction } from '../types'

export const calculatePriorityResults = (
  opts: Faction[],
  seed: number,
  response: CalculationResults,
  randomizedPlayers: Player[],
  randomizedVagabond: ValidVagabonds[],
): CalculationResults => {
  const input = opts
    .filter((faction: Faction) => {
      return faction.priority !== 99
    })
    .sort((a: Faction, b: Faction) => {
      return a.playerOwnerId - b.playerOwnerId
    })
  const finalFactionList: Faction[] = input.reduce((acc: Faction[], current: Faction) => {
    if (acc.length === randomizedPlayers.length) return acc // We already finished but there's no break in reduce
    const check =
      acc.length > 0 &&
      acc.some((faction: Faction) => {
        // either the faction is already there or there's already a faction selected for a given player
        return faction.id === current.id || faction.playerOwnerId === current.playerOwnerId
      })
    if (!check) {
      acc.push(current)
    }
    return acc
  }, [])
  const results: ResultEntries[] = randomizedPlayers.map((player: Player) => {
    const match = finalFactionList.find((faction: Faction) => faction.playerOwnerId === player.id)
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
