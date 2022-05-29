import React from 'react'
import { Methods, ValidMethods } from '../types'

interface Props {
  pathname: string
  methodName: ValidMethods | string
}

export const DynamicSubheader = ({ pathname, methodName }: Props) => {
  const unknown = <h2>Unknown location</h2>

  switch (pathname) {
    case '/':
      return <h2>Method & Players</h2>
    case '/faction-selection':
      return <h2>Filter Factions</h2>
    case '/manual-select':
      return <h2>Pick Factions</h2>
    case '/priority-select':
      return <h2>Prioritize Factions</h2>
    case '/results':
      if (
        methodName === Methods.LIST ||
        methodName === Methods.PICK ||
        methodName === Methods.PRIORITY ||
        methodName === Methods.RANDOM
      ) {
        return <h2>Results - {methodName?.charAt(0).toUpperCase() + methodName?.slice(1)}</h2>
      }
      return <h2>Results</h2>
    default:
      break
  }

  return unknown
}
