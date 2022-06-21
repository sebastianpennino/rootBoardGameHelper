import React, { useContext } from 'react'
import { IconContext } from 'react-icons'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { MAX_PLAYERS, MIN_PLAYABLE_PLAYERS } from '../App'
import { RBGHContext, RBGHStoreContent } from '../Store'
import { Player, PlayerReducerActionTypes } from '../types'
import { PlayerItem } from './PlayerItem'

export const PlayerSelection = () => {
  const { playerList, playerDispatch } = useContext<RBGHStoreContent>(RBGHContext)

  return (
    <form
      noValidate
      onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault() // Otherwise the Add player button would trigger an old fashion submit
      }}
    >
      <ol className="player-grid">
        {playerList.map((player: Player, idx: number) => (
          <PlayerItem
            disableRemove={playerList.length <= MIN_PLAYABLE_PLAYERS || idx < 3}
            idx={idx}
            key={player.id}
            player={player}
          />
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
        <IconContext.Provider value={{ size: '3em' }}>
          <BsFillPlusCircleFill />
        </IconContext.Provider>
      </button>
    </form>
  )
}
