import { Methods, SubRandomMethods, ValidMethods, ValidSubRandomMethods } from '../types'

export const methodsOptions: Record<ValidMethods, string> = {
  [Methods.RANDOM]: 'Random',
  [Methods.LIST]: 'Random Recommended List',
  [Methods.PICK]: 'Manual Selection',
  [Methods.PRIORITY]: 'Priority Selection',
}

export const subMethodsOptions: Record<ValidSubRandomMethods, string> = {
  [SubRandomMethods.RECOMMENDED_LIST]: 'Recommended List',
  [SubRandomMethods.SEED_RANDOM]: 'Random',
}
