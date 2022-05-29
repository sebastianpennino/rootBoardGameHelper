import React, { useContext } from 'react'
import { MAX_PLAYERS } from '../App'
import { RBGHContext } from '../Store'
import { Player, PlayerReducerActionTypes } from '../types'
import { PlayerItem } from './PlayerItem'

export const PlayerSelection = () => {
  const { playerList, playerDispatch } = useContext<any>(RBGHContext)

  return (
    <form
      noValidate
      onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault() // Otherwise the Add player button would trigger an old fashion submit
      }}
    >
      <ol className="player-grid">
        {playerList.map((player: Player, idx: number) => (
          <PlayerItem disableRemove={playerList.length === 1 || idx === 0} idx={idx} key={player.id} player={player} />
        ))}
      </ol>
      <button
        className="add-player"
        disabled={playerList.length === MAX_PLAYERS}
        onClick={() => {
          playerDispatch({ type: PlayerReducerActionTypes.ADD_PLAYER })
        }}
        tabIndex={0}
        title="add player"
      >
        Add player
      </button>
    </form>
  )
}
