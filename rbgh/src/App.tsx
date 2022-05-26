import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './Routes'
import { Header } from './components/Header'

// Styles
import './css/App.css'

function App() {
  return (
    <div className="rbgh">
      <Router>
        <Header />
        <main className="content">
          <AppRoutes />
        </main>
      </Router>
    </div>
  )
}

export default App
