import { PlayerReducerActionTypes } from '../types'
import { RemovePlayerButton } from './RemovePlayerButton'
import { useContext } from 'react'
import Fade from './Fade'
import { RBGHContext } from '../Store'

export const PlayerItem = ({ player, idx, disableRemove }: any) => {
  const { playerDispatch: dispatch } = useContext<any>(RBGHContext)

  return (
    <Fade
      as="li"
      show={player.show}
      except={idx === 0}
      callback={() => {
        if (player.show === false) {
          dispatch({ type: PlayerReducerActionTypes.REMOVE_PLAYER, payload: { id: player.id } })
        }
      }}
    >
      <div className="player-item">
        <div className="question">
          <input
            type="text"
            required
            onChange={(e) => {
              dispatch({
                type: PlayerReducerActionTypes.UPDATE_PLAYER,
                payload: { name: e.target.value, id: player.id },
              })
            }}
            onKeyPress={(e) => {
              if (e.code === 'Enter') {
                e.preventDefault()
              }
            }}
            value={player.name}
            className="player-item-input"
            tabIndex={idx + 5}
          />
          <label>Player {idx + 1}</label>
          {!disableRemove && <RemovePlayerButton player={player} tabIndex={idx + 11} />}
        </div>
      </div>
    </Fade>
  )
}
