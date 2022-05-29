import { PlayerReducerActionTypes } from '../types'
import { RemovePlayerButton } from './RemovePlayerButton'
import { useContext } from 'react'
import Fade from './Fade'
import RBGHContext from '../RBGHContext'

export const PlayerItem = ({ player, idx, disableRemove }: any) => {
  const { playerDispatch: dispatch } = useContext<any>(RBGHContext)

  return (
    <Fade
      show={player.show}
      callback={() => {
        if (player.show === false) {
          dispatch({ type: PlayerReducerActionTypes.REMOVE_PLAYER, payload: { id: player.id } })
        }
      }}
    >
      <li className="player-item">
        <div className="question" style={{ animation: `${player.show ? 'fadeIn' : 'fadeOut'} 1s` }}>
          <input
            type="text"
            required
            onChange={(e) => {
              dispatch({
                type: PlayerReducerActionTypes.UPDATE_PLAYER,
                payload: { name: e.target.value, id: player.id },
              })
            }}
            value={player.name}
            className="player-item-input"
            tabIndex={idx + 5}
          />
          <label>Player {idx + 1}</label>
          {!disableRemove && <RemovePlayerButton player={player} tabIndex={idx + 11} />}
        </div>
      </li>
    </Fade>
  )
}
