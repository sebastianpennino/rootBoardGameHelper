import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { allFactions as factions, methodsOptions } from '../data'
import { Methods, SubRandomMethods, ValidMethods, ValidSubRandomMethods } from '../types'
import cancel from '../assets/icons/cancel-red.svg'
import { IconContext } from 'react-icons'
import { BsHandIndex } from 'react-icons/bs'
import { GiCardRandom, GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { HiSortDescending } from 'react-icons/hi'

// Styles
import '../css/landing-page.css'
import Fade from '../components/Fade'

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
    return <NavLink to="/faction-X">Next: X Selection</NavLink>
  },
}

function PlayerItem({ player, idx, removeFn, updateFn, disableRemove, hideFn, startHideAnimation }: any) {
  const [currentPlayer, setCurrentPlayer] = useState<any>(player)
  return (
    <Fade
      show={player.show}
      callback={() => {
        removeFn(player.id)
      }}
    >
      <li className="player-item">
        <div
          className="question"
          style={{ animation: `${player.show ? 'fadeIn' : 'fadeOut'} 1s` }}
          // onAnimationEnd={onAnimationEnd}
        >
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
              updateFn(player.id, val)
            }}
            tabIndex={idx}
          />
          <label>Player {idx + 1}</label>
          <button
            onClick={() => {
              hideFn(player.id) //when using hiding, the removeFn gets triggered onAnimationEnd instead of here
              // startHideAnimation(player.id)
              // removeFn(player.id)
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

const initial = [
  { name: '', id: 1, show: true },
  { name: '', id: 2, show: true },
  { name: '', id: 3, show: true },
]

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
  const [playerList, setPlayerList] = useState<any>([...initial])

  const addPlayer = () => {
    setPlayerList((prevList: any) => [...prevList, { name: '', id: new Date().getTime(), show: true }])
  }

  const removePlayer = (id: any) => {
    console.log('REMOVE player:, ', id)
    setPlayerList((prevList: any) => {
      return prevList.filter((player: any) => player.id !== id)
    })
  }

  const hidePlayer = (id: any) => {
    console.log('HIDE player:, ', id)
    setPlayerList((prevList: any) => {
      const foundIdx = prevList.findIndex((player: any) => player.id === id)
      if (foundIdx !== -1 && prevList[foundIdx].show) {
        prevList[foundIdx].show = false
        return [...prevList]
      }
      return prevList
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

  return (
    <>
      <div>
        <h3>Choose Method</h3>

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

        {/* <IconContext.Provider value={{ color: '#cc2424', size: '3em' }}>
          <GiCardRandom title="Random From List" />
          <GiPerspectiveDiceSixFacesRandom title="Truly Random" />
          <BsHandIndex title="Manual Selection" />
          <HiSortDescending title="Priority List" />
        </IconContext.Provider> */}
        {/* 
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
*/}
      </div>
      <form noValidate onSubmit={handleSubmit}>
        <h3>Players</h3>
        <ol className="player-grid">
          {playerList.map((player: any, idx: number) => (
            <PlayerItem
              player={player}
              key={player.id}
              removeFn={removePlayer}
              updateFn={updatePlayer}
              disableRemove={isMin}
              idx={idx}
              hideFn={hidePlayer}
              startHideAnimation={hidePlayer}
            />
          ))}
        </ol>
        <button onClick={addPlayer} disabled={isMax} className="add-player" title="add player">
          Add player
        </button>
      </form>

      {/* <div>{isValidSelection() && isValidMethodSelection() && nextButtonSwitch[method]()}</div> */}
    </>
  )
}
