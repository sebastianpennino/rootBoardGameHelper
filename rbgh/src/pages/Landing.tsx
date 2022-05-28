import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { allFactions as factions } from '../data'
import { Methods, Player, ValidMethods } from '../types'
import cancel from '../assets/icons/cancel-red.svg'
import { IconContext } from 'react-icons'
import { BsHandIndex } from 'react-icons/bs'
import { GiCardRandom, GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { HiSortDescending } from 'react-icons/hi'

// Styles
import '../css/landing-page.css'
import Fade from '../components/Fade'
import RBGHContext from '../RBGHContext'
import { PlayerReducerActionTypes } from '../App'

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
  [Methods.LIST]: () => {
    return <NavLink to={`/results?type=${Methods.LIST}`}>Next: Results List</NavLink>
  },
}

function PlayerItem({ player, idx, disableRemove }: any) {
  // TODO: this might not be necesary anymore!
  const [currentPlayer, setCurrentPlayer] = useState<any>(player)
  const { playerDispatch } = useContext<any>(RBGHContext)

  return (
    <Fade
      show={player.show}
      callback={() => {
        playerDispatch({ type: PlayerReducerActionTypes.REMOVE_PLAYER, payload: { id: player.id } })
      }}
    >
      <li className="player-item">
        <div className="question" style={{ animation: `${player.show ? 'fadeIn' : 'fadeOut'} 1s` }}>
          <input
            type="text"
            required
            value={currentPlayer.name}
            onChange={(e) => {
              const val = e.target.value
              setCurrentPlayer((oldValue: any) => ({ name: val, id: oldValue.id }))
            }}
            onBlur={(e) => {
              const val = e.target.value
              playerDispatch({ type: PlayerReducerActionTypes.UPDATE_PLAYER, payload: { name: val, id: player.id } })
            }}
            tabIndex={idx}
          />
          <label>Player {idx + 1}</label>
          <button
            onClick={() => {
              playerDispatch({ type: PlayerReducerActionTypes.HIDE_PLAYER, payload: { id: player.id } })
            }}
            disabled={disableRemove}
            className="remove-player"
            title="remove player"
          >
            <img src={cancel} alt="remove" />
          </button>
        </div>
      </li>
    </Fade>
  )
}

interface MyMethod {
  name: ValidMethods
  id: number
  icon: () => React.ReactNode
  desc?: string
  selected: boolean
}

const allMethods: MyMethod[] = [
  {
    name: Methods.PICK,
    id: 2,
    icon: () => <BsHandIndex title="Manual Selection" />,
    desc: 'Manual Pick',
    selected: true,
  },
  {
    name: Methods.RANDOM,
    id: 3,
    icon: () => <GiPerspectiveDiceSixFacesRandom title="Truly Random" />,
    desc: 'Truly Random',
    selected: false,
  },
  {
    name: Methods.LIST,
    id: 4,
    icon: () => <GiCardRandom title="Random From List" />,
    desc: 'Random List',
    selected: false,
  },
  {
    name: Methods.PRIORITY,
    id: 1,
    icon: () => <HiSortDescending title="Priority List" />,
    desc: 'Priority',
    selected: false,
  },
]

export function PlayerSelection() {
  const { playerList, playerDispatch } = useContext<any>(RBGHContext)

  const isMin = playerList.length === 1
  const isMax = playerList.length === 6

  const isValidSelection = () => {
    return playerList.length >= 3 && !playerList.some((player: any) => player.name.length < 2)
  }

  const [methodList, setMethodList] = useState<MyMethod[]>([...allMethods])

  const selectMethod = (id: number) => {
    setMethodList((oldState: MyMethod[]) => {
      return oldState.map((oldMethod: MyMethod) => {
        return {
          ...oldMethod,
          selected: id === oldMethod.id,
        }
      })
    })
  }

  const isValidMethodSelection = () => {
    /*
      selectable factions >= players
    */
    return factions.length > 3
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log('handleSubmit!')
  }

  const currentSelectedMethod = (): ValidMethods => {
    return methodList.find((method) => method.selected === true)?.name ?? methodList[0].name
  }

  return (
    <>
      <div>
        {/* <h3>Choose Method</h3> */}
        <IconContext.Provider value={{ color: '#ff4a56', size: '3em' }}>
          <ol className="method-list">
            {methodList.map((method: MyMethod) => {
              return (
                <li key={method.name} className="method-item">
                  <button
                    className={`btn btn__slide-from-left ${method.selected ? 'selected' : ''}`}
                    // style={{backgroundColor:'#ccc'}}
                    onClick={() => {
                      selectMethod(method.id)
                    }}
                  >
                    <figure className="method-picture">{method.icon()}</figure>
                    <span>{method.desc}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </IconContext.Provider>
      </div>
      <form noValidate onSubmit={handleSubmit}>
        {/* <h3>Players</h3> */}
        <ol className="player-grid">
          {playerList.map((player: Player, idx: number) => (
            <PlayerItem player={player} key={idx} disableRemove={isMin} idx={idx} />
          ))}
        </ol>
        <button
          onClick={() => {
            playerDispatch({ type: PlayerReducerActionTypes.ADD_PLAYER })
          }}
          disabled={isMax}
          className="add-player"
          title="add player"
        >
          Add player
        </button>

        {/* <small><pre>{JSON.stringify({playerList}, null, 2)}</pre></small> */}
      </form>

      <div className="fake-btn">{nextButtonSwitch[currentSelectedMethod()]()}</div>
    </>
  )
}
