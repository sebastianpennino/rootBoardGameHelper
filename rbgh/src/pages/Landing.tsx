import '../css/landing-page.css' // Styles
import { MethodOption, ValidMethods } from '../types'
import { MethodSelection } from '../components/MethodSelection'
import { MIN_PLAYABLE_PLAYERS } from '../App'
import { NextButtonSwitch } from '../data'
import { PlayerSelection } from '../components/PlayerSelection'
import { RBGHContext } from '../Store'
import React, { useContext } from 'react'

export function Landing() {
  const { playerList, methodList } = useContext<any>(RBGHContext)

  const currentSelectedMethod = (): ValidMethods => {
    return methodList.find((method: MethodOption) => method.selected === true)?.name ?? methodList[0].name
  }

  return (
    <>
      <MethodSelection />
      <PlayerSelection />
      <div className="fake-btn">
        {playerList.length >= MIN_PLAYABLE_PLAYERS && NextButtonSwitch[currentSelectedMethod()]()}
      </div>
    </>
  )
}
