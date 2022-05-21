import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { allFactions as factions } from '../data'
import { Methods, SubRandomMethods, ValidMethods, ValidSubRandomMethods } from '../types'

// Styles
import '../css/landing-page.css'

const nextButtonSwitch = {
  [Methods.PRIORITY]: () => {
    return <NavLink to="/priority-select">Next: Priority Selection</NavLink>
  },
  [Methods.PICK]: () => {
    return <NavLink to="/manual-select">Next: Manual Selection</NavLink>
  },
  [Methods.RANDOM]: () => {
    return <NavLink to="/faction-selection">Next: Faction Selection</NavLink>
  },
}

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

  const [method, setMethod] = useState<ValidMethods>(Methods.RANDOM)
  const [subMethod, setSubMethod] = useState<ValidSubRandomMethods>(SubRandomMethods.RECOMMENDED_LIST)

  const isValidMethodSelection = () => {
    /*
      selectable factions >= players
    */
    return factions.length > 3
  }

  return (
    <>
      <h3>Players</h3>
      <ul className="player-grid">
        {playerList.map((player: any) => (
          <PlayerItem
            player={player}
            key={player.id}
            removeFn={removePlayer}
            updateFn={updatePlayer}
            disableRemove={isMin}
          />
        ))}
      </ul>
      <button onClick={addPlayer} disabled={isMax}>
        Add player
      </button>
      <div>
        <h3>Choose Method</h3>
        <div className="methodSelection">
          <select
            name="methodSelection"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const val = e.target.value as ValidMethods
              setMethod(val)
            }}
            value={method}
          >
            <option value={Methods.RANDOM}>Random</option>
            <option value={Methods.PICK}>Manual</option>
            <option value={Methods.PRIORITY}>Priority</option>
          </select>
        </div>
        {method === Methods.RANDOM && (
          <div className="subMethodSelection">
            <select
              name="methodSelection"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const val = e.target.value as ValidSubRandomMethods
                setSubMethod(val)
              }}
              value={subMethod}
            >
              <option value={SubRandomMethods.RECOMMENDED_LIST}>Recommended List</option>
              <option value={SubRandomMethods.SEED_RANDOM}>Truly Random</option>
            </select>
          </div>
        )}
      </div>

      <div>{isValidSelection() && isValidMethodSelection() && nextButtonSwitch[method]()}</div>
    </>
  )
}
