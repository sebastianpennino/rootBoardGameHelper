import React from 'react'
import ologo from '../assets/images/favicon-32x32.png'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Location } from 'history'

// Styles
import '../css/header.css'
import { ValidMethods } from '../types'

interface Props {
  pathname: string
  methodName: string
}

const DynamicSubheader = ({ pathname, methodName = 'unknown' }: Props) => {
  const unknown = <h2>Unknown location</h2>

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
      const capitalizedMethod = methodName?.charAt(0).toUpperCase() + methodName?.slice(1)
      return <h2>Results - {capitalizedMethod}</h2>
    default:
      break
  }

  return unknown
}

export const Header = () => {
  const location: Location = useLocation()
  const pathname = location.pathname
  const [searchParams] = useSearchParams()
  const methodName = searchParams.get('type') as ValidMethods

  return (
    <header>
      {/* <AppNavigation /> */}
      <div className="app-header">
        <img src={ologo} alt="root boardgame logo" />
        <h1>Root Board Game Helper</h1>
      </div>
      <DynamicSubheader pathname={pathname} methodName={methodName} />
    </header>
  )
}
