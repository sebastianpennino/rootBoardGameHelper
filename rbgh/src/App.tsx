import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './Routes'
import { AppNavigation } from './Nav'

// Styles
import './css/app.css'

function App() {
  return (
    <div className="rbgh">
      <Router>
        <AppNavigation />
        <AppRoutes />
      </Router>
    </div>
  )
}

export default App
