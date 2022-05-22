import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './Routes'
import { AppNavigation } from './Nav'

// Styles
import './css/App.css'

function App() {
  return (
    <div className="rbgh">
      <Router>
        <AppNavigation />
        <main className="content">
          <AppRoutes />
        </main>
      </Router>
    </div>
  )
}

export default App
