import { Faction } from '../types'
import faces from '../assets/images/icons_v2.png'
import Fade from './Fade'
interface Props {
  playerName: string
  playerId: number
  faction?: Faction
}

export const ResultRow = (props: Props) => {
  const { playerName, faction } = props
  return (
    <Fade as="li" show={true}>
      <div className="row results-row" style={{ backgroundColor: faction?.backColor, color: faction?.frontColor }}>
        <div className="first-col">
          <figure className="results-pic-container">
            <img className="results-pic" style={{ top: faction?.picPos }} src={faces} alt="faction icon" />
          </figure>
        </div>
        <div className="column">
          <p>
            {faction?.name} ({faction?.reach}) {faction?.vagabondData ? ` - ${faction?.vagabondData}` : ''}
          </p>
        </div>
        <div className="column">
          <p>{playerName}</p>
        </div>
      </div>
    </Fade>
  )
}
