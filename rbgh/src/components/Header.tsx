import '../css/header.css'
import { DynamicSubheader } from './SubHeader'
import { Location } from 'history'
import { useLocation, useSearchParams } from 'react-router-dom'
import ologo from '../assets/images/favicon-32x32.png'
import React from 'react'

export const Header = () => {
  const location: Location = useLocation()
  const pathname = location.pathname
  const [searchParams] = useSearchParams()
  const methodName = searchParams.get('type') || ''

  return (
    <header>
      <div className="app-header">
        <img src={ologo} alt="root board game helper logo: a capital H letter with a red background" />
        <h1>Root Board Game Helper</h1>
      </div>
      <DynamicSubheader pathname={pathname} methodName={methodName} />
    </header>
  )
}
