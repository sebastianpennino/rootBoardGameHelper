import React from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import { PlayerSelection, MethodSelection, Results, NoMatch, Topics, Users, User } from './tabs'
import './App.css'

function App() {
  const users = [
    { id: '1', fullName: "T'Challa" },
    { id: '2', fullName: 'Miles Morales' },
    { id: '3', fullName: 'James Howlett' },
  ]

  return (
    <div className="App">
      <Router>
        <nav className="navigation">
          <ul>
            <li>
              <NavLink to="/" className={(n) => (n.isActive ? 'active' : '')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="step1" className={(n) => (n.isActive ? 'active' : '')}>
                page 1
              </NavLink>
            </li>
            <li>
              <NavLink to="step2" className={(n) => (n.isActive ? 'active' : '')}>
                page 2
              </NavLink>
            </li>
            <li>
              <NavLink to="step3" className={(n) => (n.isActive ? 'active' : '')}>
                page 3
              </NavLink>
            </li>
            <li>
              <NavLink to="topics" className={(n) => (n.isActive ? 'active' : '')}>
                topics
              </NavLink>
            </li>
            <li>
              <NavLink to="users" className={(n) => (n.isActive ? 'active' : '')}>
                users
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route index element={<PlayerSelection />} />
          <Route path="step1" element={<PlayerSelection />} />
          <Route path="step2" element={<MethodSelection />} />
          <Route path="step3" element={<Results />} />
          <Route path="topics" element={<Topics />}>
            <Route path="random1" element={<h3>topic: random1!</h3>} />
            <Route path="what2" element={<h3>topic: what2!</h3>} />
            <Route path="*" element={<h3>lol?!!</h3>} />
          </Route>
          <Route path="users" element={<Users users={users} />}>
            <Route path=":userId" element={<User />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
