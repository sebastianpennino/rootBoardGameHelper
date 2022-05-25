export enum Methods {
  PICK = 'pick',
  RANDOM = 'random',
  LIST = 'list',
  PRIORITY = 'priority',
}

export type ValidMethods = Methods.PICK | Methods.RANDOM | Methods.PRIORITY | Methods.LIST

export enum SubRandomMethods {
  SEED_RANDOM = 'seed_random',
  RECOMMENDED_LIST = 'recommended_list',
}

export type ValidSubRandomMethods = SubRandomMethods.RECOMMENDED_LIST | SubRandomMethods.SEED_RANDOM
