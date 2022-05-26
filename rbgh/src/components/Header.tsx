import React from 'react'
import { AppNavigation } from '../Nav'
import ologo from '../assets/images/favicon-32x32.png'
import { useLocation } from 'react-router-dom'
import { Location } from 'history'

// Styles
import '../css/header.css'

interface Props {
  pathname: string
}

const DynamicSubheader = ({ pathname }: Props) => {
  let rst = <h2>Unknown location</h2>

  switch (pathname) {
    case '/':
      return <h2>Method & Players</h2>
    case '/faction-selection':
      return <h2>Filter Factions</h2>
    case '/manual-select':
      return <h2>Pick Factions</h2>
    case '/priority-select':
      return <h2>Prioritize Factions</h2>
    case '/results':
      return <h2>Results</h2>
    default:
      break
  }

  return rst
}

export const Header = () => {
  const location: Location = useLocation()
  const pathname = location.pathname

  return (
    <header>
      {/* <AppNavigation /> */}
      <div className="app-header">
        <img src={ologo} alt="root boardgame logo" />
        <h1>Root Board Game Helper</h1>
      </div>
      <DynamicSubheader pathname={pathname} />
    </header>
  )
}
