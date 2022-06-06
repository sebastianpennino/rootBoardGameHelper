import '../css/landing-page.css' // Styles
import { MethodOption, Player, ValidMethods } from '../types'
import { MethodSelection } from '../components/MethodSelection'
import { MIN_PLAYABLE_PLAYERS } from '../App'
import { NextButtonSwitch } from '../data'
import { PlayerSelection } from '../components/PlayerSelection'
import { RBGHContext, RBGHStoreContent } from '../Store'
import React, { useContext } from 'react'

export function Landing() {
  const { playerList, methodList } = useContext<RBGHStoreContent>(RBGHContext)

  const currentSelectedMethod = (): ValidMethods => {
    return methodList.find((method: MethodOption) => method.selected === true)?.name ?? methodList[0].name
  }

  const isValidPlayerSelection = (): true | React.ReactNode => {
    const hasInvalidPlayerName = playerList.some((player: Player) => {
      return player.name === '' || player.name.length < 3
    })
    if (hasInvalidPlayerName) {
      return <p className="error-msg">To continue, all player names must be at least 3 character long</p>
    }
    return true
  }

  return (
    <>
      <MethodSelection />
      <PlayerSelection />
      {isValidPlayerSelection() === true ? (
        <div className="btn-next-container">
          {playerList.length >= MIN_PLAYABLE_PLAYERS && NextButtonSwitch[currentSelectedMethod()]()}
        </div>
      ) : (
        isValidPlayerSelection()
      )}
    </>
  )
}
