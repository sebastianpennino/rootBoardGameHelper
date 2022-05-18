export enum Methods {
  PICK = 'PICK',
  RANDOM = 'RANDOM',
  PRIORITY = 'PRIORITY',
}

export type ValidMethods = Methods.PICK | Methods.RANDOM | Methods.PRIORITY

export enum SubRandomMethods {
  TRULY_RANDOM = 'TRULY_RANDOM',
  RECOMMENDED_LIST = 'RECOMMENDED_LIST',
}

export type ValidSubRandomMethods = SubRandomMethods.RECOMMENDED_LIST | SubRandomMethods.TRULY_RANDOM
