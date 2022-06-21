import React from 'react'
import { Methods, ValidMethods } from '../types'
import { InfoPopOvers, MyTooltip, ValidPopOvers } from './Tooltip'

interface Props {
  pathname: string
  methodName: ValidMethods | string
  className: string
}

export const DynamicSubheader = ({ className, pathname, methodName }: Props) => {
  const unknown = <h2>Unknown location</h2>

  switch (pathname) {
    case '/':
      return (
        <h2 className={className}>
          Method & Players <MyTooltip text={InfoPopOvers.GENERAL} />
        </h2>
      )
    case '/faction-selection':
      return (
        <h2 className={className}>
          Filter Factions <MyTooltip text={InfoPopOvers.FILTER_FACTIONS} />
        </h2>
      )
    case '/manual-select':
      return (
        <h2 className={className}>
          Pick Factions <MyTooltip text={InfoPopOvers.PICK_FACTIONS} />
        </h2>
      )
    case '/priority-select':
      return (
        <h2 className={className}>
          Prioritize Factions <MyTooltip text={InfoPopOvers.PRIORITIZE_FACTIONS} />
        </h2>
      )
    case '/results':
      if (
        methodName === Methods.LIST ||
        methodName === Methods.PICK ||
        methodName === Methods.PRIORITY ||
        methodName === Methods.RANDOM
      ) {
        return <h2 className={className}>Results - {methodName?.charAt(0).toUpperCase() + methodName?.slice(1)}</h2>
      }
      return <h2 className={className}>Results</h2>
    default:
      break
  }

  return unknown
}
