import { Methods, SubRandomMethods, FactionNames, FactionStates } from '../types'

export const players = [
  { name: 'pepe', id: 1, show: true },
  { name: 'juancho', id: 2, show: true },
  { name: 'pedro', id: 3, show: true },
  { name: 'tony', id: 4, show: true },
  { name: 'wilfred', id: 5, show: true },
  { name: 'walter', id: 6, show: true },
]

export const fakeResults = {
  type: Methods.RANDOM,
  subType: SubRandomMethods.SEED_RANDOM,
  seed: 123123,
  results: [
    {
      id: 111,
      player: { name: 'pepe', id: 12 },
      selection: {
        name: FactionNames.MARQUISE_THE_CAT,
        id: 1,
        reach: 8,
        icon: '',
        state: FactionStates.INCLUDE,
        frontColor: '#0f0',
        backColor: '#8b3c3c',
      },
    },
    {
      id: 121,
      player: { name: 'juancho', id: 27 },
      selection: {
        name: FactionNames.EYRIE,
        id: 1,
        reach: 8,
        icon: '',
        state: FactionStates.INCLUDE,
        frontColor: '#00f',
        backColor: '#8e9f75',
      },
    },
    {
      id: 132,
      player: { name: 'worf', id: 44 },
      selection: {
        name: FactionNames.LORD_OF_THE_HUNDREDS,
        id: 1,
        reach: 8,
        icon: '',
        state: FactionStates.MUST,
        frontColor: '#f00',
        backColor: '#b6e020',
      },
    },
  ],
}
