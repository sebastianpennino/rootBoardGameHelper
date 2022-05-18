export interface Faction {
  name: ValidFactions
  id: number
  reach: number
  icon: string
  state: string
  frontColor: string
  backColor: string
}

export enum FactionNames {
  MARQUISE_THE_CAT = 'CATS',
  EERYE_DINASTY = 'BIRDS',
  WOODLAND_ALLIANCE = 'ALLIANCE',
  VAGABOND1 = 'VAGABOND',
  RIVERFOLK_COMPANY = 'OTTERS',
  LIZARD_CULT = 'LIZARDS',
  VAGABOND2 = 'VAGABOND_2',
  UNDERGROUND_DUCHY = 'MOLES',
  CORVID_CONSPIRACY = 'CORVIDS',
  KEEPERS_IN_IRON = 'BADGERS',
  LORD_OF_THE_HUNDREDS = 'MICE',
}

export type ValidFactions =
  | FactionNames.MARQUISE_THE_CAT
  | FactionNames.EERYE_DINASTY
  | FactionNames.WOODLAND_ALLIANCE
  | FactionNames.VAGABOND1
  | FactionNames.VAGABOND2
  | FactionNames.RIVERFOLK_COMPANY
  | FactionNames.LIZARD_CULT
  | FactionNames.UNDERGROUND_DUCHY
  | FactionNames.CORVID_CONSPIRACY
  | FactionNames.KEEPERS_IN_IRON
  | FactionNames.LORD_OF_THE_HUNDREDS
