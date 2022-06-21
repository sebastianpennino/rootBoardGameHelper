import '../css/header.css'
import { DynamicSubheader } from './SubHeader'
import { Location } from 'history'
import { NavLink, useLocation, useSearchParams } from 'react-router-dom'
import ologo from '../assets/images/favicon-32x32.png'
import React from 'react'
import { IconContext } from 'react-icons'

export const Header = () => {
  const location: Location = useLocation()
  const pathname = location.pathname
  const [searchParams] = useSearchParams()
  const methodName = searchParams.get('type') || ''

  return (
    <header>
      <div className="app-header">
        <NavLink to="/">
          <img src={ologo} alt="root board game helper logo: a capital H letter with a red background" />
        </NavLink>
        <h1>Root Board Game Helper</h1>
      </div>
      <IconContext.Provider value={{ color: '#ff4a56', size: '2em' }}>
        <DynamicSubheader className="sub-header" pathname={pathname} methodName={methodName} />
      </IconContext.Provider>
    </header>
  )
}
