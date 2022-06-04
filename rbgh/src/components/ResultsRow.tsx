import { Faction } from '../types'
import faces from '../assets/images/icons_v2.png'
interface Props {
  playerName: string
  playerId: number
  faction?: Faction
}

export const ResultRow = (props: Props) => {
  const { playerName, faction, playerId } = props
  return (
    <li className="row results-row" style={{ backgroundColor: faction?.backColor, color: faction?.frontColor }}>
      <div className="first-col">
        <figure className="results-pic-container">
          <img className="results-pic" style={{ top: faction?.picPos }} src={faces} alt="faction icon" />
        </figure>
      </div>
      <div className="column">
        <p>
          {faction?.name}
          {faction?.vagabondData ? `- ${faction?.vagabondData}` : ''} (Reach: {faction?.reach}){' '}
        </p>
      </div>
      <div className="column">
        <p>
          {playerName} (Id: {playerId})
        </p>
      </div>
    </li>
  )
}
