import '../css/landing-page.css' // Styles
import { MAX_PLAYERS, MIN_PLAYABLE_PLAYERS } from '../App'
import { MethodItem } from '../components/MethodItem'
import { MethodOption, Player, PlayerReducerActionTypes, ValidMethods } from '../types'
import { NextButtonSwitch } from '../data'
import { PlayerItem } from '../components/PlayerItem'
import RBGHContext from '../RBGHContext'
import React, { useContext } from 'react'

export function PlayerSelection() {
  const { playerList, playerDispatch, methodList, setMethodList } = useContext<any>(RBGHContext)

  const currentSelectedMethod = (): ValidMethods => {
    return methodList.find((method: MethodOption) => method.selected === true)?.name ?? methodList[0].name
  }

  const selectMethod = (id: number) => {
    setMethodList((oldState: MethodOption[]) => {
      return oldState.map((oldMethod: MethodOption) => {
        return {
          ...oldMethod,
          selected: id === oldMethod.id,
        }
      })
    })
  }

  return (
    <>
      <ol className="method-list">
        {methodList.map((method: MethodOption, idx: number) => (
          <MethodItem idx={idx} key={method.id} method={method} selectMethod={selectMethod} />
        ))}
      </ol>
      <form
        noValidate
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault()
        }}
      >
        <ol className="player-grid">
          {playerList.map((player: Player, idx: number) => (
            <PlayerItem disableRemove={playerList.length === 1} idx={idx} key={player.id} player={player} />
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
      <div className="fake-btn">
        {playerList.length >= MIN_PLAYABLE_PLAYERS && NextButtonSwitch[currentSelectedMethod()]()}
      </div>
    </>
  )
}
