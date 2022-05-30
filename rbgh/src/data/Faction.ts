import { ValidFactions, FactionNames, FactionStates, ValidFactionStates, Faction } from '../types'
/* faction pics */
import corvidPic from '../assets/images/faction-corvid.png'
import cultPic from '../assets/images/faction-cult.png'
import duchyPic from '../assets/images/faction-duchy.png'
import eyriePic from '../assets/images/faction-eyrie.png'
import keepersPic from '../assets/images/faction-keepers.png'
import marquisePic from '../assets/images/faction-marquise.png'
import riverfolkPic from '../assets/images/faction-riverfolk.png'
import vagabondPic from '../assets/images/faction-vagabond.png'
import vagabond2Pic from '../assets/images/faction-vagabond-2.png'
import warlordPic from '../assets/images/faction-warlord.png'
import woodlandPic from '../assets/images/faction-woodland.png'

export const factionsReach: Record<ValidFactions, number> = {
  [FactionNames.MARQUISE_THE_CAT]: 10,
  [FactionNames.EYRIE]: 7,
  [FactionNames.WOODLAND_ALLIANCE]: 3,
  [FactionNames.VAGABOND1]: 5,
  [FactionNames.VAGABOND2]: 2,
  [FactionNames.RIVERFOLK_COMPANY]: 5,
  [FactionNames.LIZARD_CULT]: 2,
  [FactionNames.UNDERGROUND_DUCHY]: 8,
  [FactionNames.CORVID_CONSPIRACY]: 3,
  [FactionNames.KEEPERS_IN_IRON]: 8,
  [FactionNames.LORD_OF_THE_HUNDREDS]: 9,
}

export const factionsButtonIcon: Record<ValidFactions, string> = {
  [FactionNames.MARQUISE_THE_CAT]: marquisePic,
  [FactionNames.EYRIE]: eyriePic,
  [FactionNames.WOODLAND_ALLIANCE]: woodlandPic,
  [FactionNames.VAGABOND1]: vagabondPic,
  [FactionNames.VAGABOND2]: vagabond2Pic,
  [FactionNames.RIVERFOLK_COMPANY]: riverfolkPic,
  [FactionNames.LIZARD_CULT]: cultPic,
  [FactionNames.UNDERGROUND_DUCHY]: duchyPic,
  [FactionNames.CORVID_CONSPIRACY]: corvidPic,
  [FactionNames.KEEPERS_IN_IRON]: keepersPic,
  [FactionNames.LORD_OF_THE_HUNDREDS]: warlordPic,
}

export const factionsColors: Record<ValidFactions, string> = {
  [FactionNames.MARQUISE_THE_CAT]: '#c0392b',
  [FactionNames.EYRIE]: '#2980b9',
  [FactionNames.WOODLAND_ALLIANCE]: '#27ae60',
  [FactionNames.VAGABOND1]: '#34495e',
  [FactionNames.VAGABOND2]: '#333333',
  [FactionNames.RIVERFOLK_COMPANY]: '#1abc9c',
  [FactionNames.LIZARD_CULT]: '#f1c40f',
  [FactionNames.UNDERGROUND_DUCHY]: '#A47290',
  [FactionNames.CORVID_CONSPIRACY]: '#673ab7',
  [FactionNames.KEEPERS_IN_IRON]: '#6d6e71',
  [FactionNames.LORD_OF_THE_HUNDREDS]: '#b51834',
}

export const nextStateCycle: Record<ValidFactionStates, ValidFactionStates> = {
  [FactionStates.INCLUDE]: FactionStates.MUST,
  [FactionStates.MUST]: FactionStates.EXCLUDE,
  [FactionStates.EXCLUDE]: FactionStates.INCLUDE,
}

export const factionsIndex: Record<ValidFactions, number> = {
  [FactionNames.MARQUISE_THE_CAT]: 1,
  [FactionNames.EYRIE]: 2,
  [FactionNames.WOODLAND_ALLIANCE]: 3,
  [FactionNames.VAGABOND1]: 4,
  [FactionNames.VAGABOND2]: 5,
  [FactionNames.RIVERFOLK_COMPANY]: 6,
  [FactionNames.LIZARD_CULT]: 7,
  [FactionNames.UNDERGROUND_DUCHY]: 8,
  [FactionNames.CORVID_CONSPIRACY]: 9,
  [FactionNames.KEEPERS_IN_IRON]: 10,
  [FactionNames.LORD_OF_THE_HUNDREDS]: 11,
}

export const generateFactions = (allFactions: ValidFactions[]): Faction[] => {
  return allFactions.map((factionName: ValidFactions) => ({
    id: factionsIndex[factionName],
    name: factionName,
    icon: factionsButtonIcon[factionName],
    reach: factionsReach[factionName],
    state: factionName === FactionNames.VAGABOND2 ? FactionStates.EXCLUDE : FactionStates.INCLUDE,
    priority: 99,
    playerOwnerId: -1,
    frontColor: '#ffffff',
    backColor: factionsColors[factionName],
  }))
}

export const allFactions = generateFactions([
  FactionNames.MARQUISE_THE_CAT,
  FactionNames.EYRIE,
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
