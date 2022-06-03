import { minReachByPlayers } from '../data'
import { SelectableFaction } from '../pages/selection'
import { Player, ResultEntries } from '../types'

interface Props {
  availablefactions: SelectableFaction[]
  selection: ResultEntries[]
  players: Player[]
}

export const ReachCalculator = (props: Props) => {
  const { availablefactions, selection, players } = props

  const calculateSelectedReach = () => {
    const totalbeforeSelection =
      selection.reduce((totalReach: number, entry: ResultEntries) => {
        return totalReach + (entry.faction?.reach ?? 0)
      }, 0) || 0
    const currentSelection =
      availablefactions.find((faction: SelectableFaction) => {
        return faction.selected
      })?.reach || 0
    return totalbeforeSelection + currentSelection
  }

  return (
    <>
      <div>
        Selected:{' '}
        {availablefactions.find((faction: SelectableFaction) => {
          return faction.selected
        })?.name || 'None'}{' '}
        (Reach:{' '}
        {availablefactions.find((faction: SelectableFaction) => {
          return faction.selected
        })?.reach || 0}
        )
      </div>
      <div>
        Total Reach: {calculateSelectedReach()} of a recommended {minReachByPlayers[players.length]}
      </div>
    </>
  )
}
