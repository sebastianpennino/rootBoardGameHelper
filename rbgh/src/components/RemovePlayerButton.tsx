import cancel from '../assets/icons/cancel-red.svg'
import { Player, PlayerReducerActionTypes } from '../types'
import { useContext } from 'react'
import { RBGHContext } from '../Store'

export const RemovePlayerButton = ({ player, tabIndex }: { player: Player; tabIndex: number }) => {
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
