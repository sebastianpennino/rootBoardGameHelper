import { useContext } from 'react'
import RBGHContext from '../RBGHContext'
import { Player, PlayerReducerActionTypes } from '../types'
import Fade from './Fade'
import cancel from '../assets/icons/cancel-red.svg'

const RemovePlayerButton = ({ player, tabIndex }: { player: Player; tabIndex: number }) => {
  const { playerDispatch: dispatch } = useContext<any>(RBGHContext)

  return (
    <button
      onClick={() => {
        dispatch({
          type: PlayerReducerActionTypes.HIDE_PLAYER,
          payload: { id: player.id },
        })
      }}
      className="remove-player"
      title="remove player"
      tabIndex={tabIndex}
    >
      <img src={cancel} alt="remove" />
    </button>
  )
}

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
            onBlur={(e) => {
              dispatch({
                type: PlayerReducerActionTypes.UPDATE_PLAYER,
                payload: { name: e.target.value, id: player.id },
              })
            }}
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
