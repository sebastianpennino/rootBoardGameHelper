import { BsHandIndex } from 'react-icons/bs'
import { GiPerspectiveDiceSixFacesRandom, GiCardRandom } from 'react-icons/gi'
import { HiSortDescending } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'
import { Methods, MethodOption, ValidMethods } from '../types'

export const methodsOptions: Record<ValidMethods, string> = {
  [Methods.RANDOM]: 'Random',
  [Methods.LIST]: 'Random Recommended List',
  [Methods.PICK]: 'Manual Selection',
  [Methods.PRIORITY]: 'Priority Selection',
}

export const allMethods: MethodOption[] = [
  {
    name: Methods.PICK,
    id: 1,
    icon: () => {
      return <BsHandIndex title="Manual Selection" />
    },
    desc: 'Manual Pick',
    selected: true,
  },
  {
    name: Methods.RANDOM,
    id: 2,
    icon: () => {
      return <GiPerspectiveDiceSixFacesRandom title="Truly Random" />
    },
    desc: 'Truly Random',
    selected: false,
  },
  {
    name: Methods.LIST,
    id: 3,
    icon: () => {
      return <GiCardRandom title="Random From List" />
    },
    desc: 'Random List',
    selected: false,
  },
  {
    name: Methods.PRIORITY,
    id: 4,
    icon: () => {
      return <HiSortDescending title="Priority List" />
    },
    desc: 'Priority',
    selected: false,
  },
]

export const NextButtonSwitch = {
  [Methods.PRIORITY]: () => {
    return <NavLink to="/priority-select">Next: Priority Selection</NavLink>
  },
  [Methods.PICK]: () => {
    return <NavLink to="/manual-select">Next: Manual Selection</NavLink>
  },
  [Methods.RANDOM]: () => {
    return <NavLink to="/faction-selection">Next: Faction Selection</NavLink>
  },
  [Methods.LIST]: () => {
    return <NavLink to={`/results?type=${Methods.LIST}`}>Next: Results List</NavLink>
  },
}
