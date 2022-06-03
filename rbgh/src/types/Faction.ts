import { Methods } from './Method'
import { PrioritySelection } from './Result'
import { ValidVagabonds } from './Vagabond'

export interface PriorityFilter {
  narrow: Methods.PRIORITY
  content: PrioritySelection[]
}
export interface RandomFilter {
  narrow: Methods.RANDOM
  content: Faction[]
}
export interface Faction {
  name: ValidFactions
  id: number
  reach: number
  icon: string
  state: ValidFactionStates
  frontColor: string
  backColor: string
  vagabondData?: ValidVagabonds
  priority: number
  playerOwnerId: number
}

export enum FactionNames {
  MARQUISE_THE_CAT = 'Marquise The Cat',
  EYRIE = 'Eyrie Dynasties',
  WOODLAND_ALLIANCE = 'Woodland Alliance',
  VAGABOND1 = 'Vagabond',
  RIVERFOLK_COMPANY = 'Riverfolk Company',
  LIZARD_CULT = 'Lizard Cult',
  VAGABOND2 = 'Vagabond 2',
  UNDERGROUND_DUCHY = 'Underground Duchy',
  CORVID_CONSPIRACY = 'Corvid Conspiracy',
  KEEPERS_IN_IRON = 'Kepeers In Iron',
  LORD_OF_THE_HUNDREDS = 'Lord Of The Hundreds',
}

export type ValidFactions =
  | FactionNames.MARQUISE_THE_CAT
  | FactionNames.EYRIE
  | FactionNames.WOODLAND_ALLIANCE
  | FactionNames.VAGABOND1
  | FactionNames.VAGABOND2
  | FactionNames.RIVERFOLK_COMPANY
  | FactionNames.LIZARD_CULT
  | FactionNames.UNDERGROUND_DUCHY
  | FactionNames.CORVID_CONSPIRACY
  | FactionNames.KEEPERS_IN_IRON
  | FactionNames.LORD_OF_THE_HUNDREDS

export enum FactionStates {
  INCLUDE = 'INCLUDE',
  EXCLUDE = 'EXCLUDE',
  MUST = 'MUST',
}

export type ValidFactionStates = FactionStates.EXCLUDE | FactionStates.MUST | FactionStates.INCLUDE
