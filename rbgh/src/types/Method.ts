export enum Methods {
  PICK = 'pick',
  RANDOM = 'random',
  LIST = 'list',
  PRIORITY = 'priority',
}

export type ValidMethods = Methods.PICK | Methods.RANDOM | Methods.PRIORITY | Methods.LIST

export interface MethodOption {
  name: ValidMethods
  id: number
  icon?: () => React.ReactNode
  desc?: string
  selected: boolean
}
