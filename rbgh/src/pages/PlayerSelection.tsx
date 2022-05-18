import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function PlayerItem({ player, removeFn, updateFn, disableRemove }: any) {
  const [currentPlayer, setCurrentPlayer] = useState<any>(player)
  return (
    <li>
      <input
        type="text"
        value={currentPlayer.name}
        onChange={(e) => {
          const val = e.target.value
          setCurrentPlayer((oldValue: any) => ({ name: val, id: oldValue.id }))
        }}
        onBlur={(e) => {
          const val = e.target.value
          updateFn(player.id, val)
        }}
      />
      <button
        onClick={() => {
          removeFn(player.id)
        }}
        disabled={disableRemove}
      >
        Remove me {disableRemove}
      </button>
      {player.name}
    </li>
  )
}

export function PlayerSelection() {
  const initial = [
    { name: 'pepe', id: 1 },
    { name: 'juancho', id: 2 },
    { name: 'pedro', id: 3 },
  ]

  const [playerList, setPlayerList] = useState<any>(initial)

  const addPlayer = () => {
    setPlayerList((prevList: any) => [...prevList, { name: '', id: new Date().getTime() }])
  }

  const removePlayer = (id: any) => {
    setPlayerList((prevList: any) => {
      return prevList.filter((player: any) => player.id !== id)
    })
  }

  const updatePlayer = (id: any, newName: string) => {
    setPlayerList((prevList: any) => {
      const foundIdx = prevList.findIndex((player: any) => player.id === id)
      if (foundIdx !== -1) {
        let player = {
          ...prevList[foundIdx],
          name: newName,
        }
        prevList[foundIdx] = player
      }
      return [...prevList]
    })
  }

  const isMin = playerList.length === 1
  const isMax = playerList.length === 6
  const isValidSelection = () => {
    return playerList.length >= 3 && !playerList.some((player: any) => player.name.length < 2)
  }

  return (
    <>
      {playerList.map((player: any) => (
        <PlayerItem
          player={player}
          key={player.id}
          removeFn={removePlayer}
          updateFn={updatePlayer}
          disableRemove={isMin}
        />
      ))}
      <button onClick={addPlayer} disabled={isMax}>
        Add player
      </button>
      {isValidSelection() && (
        <NavLink to="/step2" className={(n: any) => (n.isActive ? 'active' : '')}>
          next step
        </NavLink>
      )}
    </>
  )
}
