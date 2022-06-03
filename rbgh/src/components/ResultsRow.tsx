import { Faction } from '../types'

interface Props {
  playerName: string
  playerId: number
  faction?: Faction
}

export const ResultRow = (props: Props) => {
  const { playerName, faction, playerId } = props
  return (
    <li className="row">
      <div className="column">
        {playerName} (Id: {playerId})
      </div>
      <div className="column">
        {faction?.name}
        {faction?.vagabondData ? `- ${faction?.vagabondData}` : ''} (Reach: {faction?.reach}){' '}
      </div>
    </li>
  )
}
