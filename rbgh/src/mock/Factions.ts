import { FactionsButtonIcon, FactionsReach, FactionsColors } from '../data'
import { Faction, FactionNames, ValidFactions } from '../types'

const generateFactions = (allFactions: ValidFactions[]): Faction[] => {
  return allFactions.map((factionName: ValidFactions, idx) => ({
    id: idx + 1,
    name: factionName,
    icon: FactionsButtonIcon[factionName],
    reach: FactionsReach[factionName],
    state: factionName === FactionNames.VAGABOND2 ? 'exclude' : 'include',
    frontColor: '#ffffff',
    backColor: FactionsColors[factionName],
  }))
}

export const factions = generateFactions([
  FactionNames.MARQUISE_THE_CAT,
  FactionNames.EERYE_DINASTY,
  FactionNames.WOODLAND_ALLIANCE,
  FactionNames.VAGABOND1,
  FactionNames.RIVERFOLK_COMPANY,
  FactionNames.LIZARD_CULT,
  FactionNames.UNDERGROUND_DUCHY,
  FactionNames.CORVID_CONSPIRACY,
  FactionNames.KEEPERS_IN_IRON,
  FactionNames.LORD_OF_THE_HUNDREDS,
  FactionNames.VAGABOND2,
])
