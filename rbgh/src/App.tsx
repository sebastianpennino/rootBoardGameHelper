import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './Routes'
import { Header } from './components/Header'
import { Player } from './types'
import RBGHContext from './RBGHContext'

// Styles
import './css/App.css'

const initialPlayerList = [
  {
    name: 'StartingPlayer',
    id: 1,
    show: true,
  },
]

function App() {
  const [playerList, setPlayerList] = useState<Player[]>([...initialPlayerList])

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

  const passProps = {
    playerList,
    addPlayer,
    removePlayer,
    hidePlayer,
    updatePlayer,
  }

  return (
    <RBGHContext.Provider value={passProps}>
      <div className="rbgh">
        <Router>
          <Header />
          <main className="content">
            <AppRoutes />
          </main>
        </Router>
      </div>
    </RBGHContext.Provider>
  )
}

export default App
