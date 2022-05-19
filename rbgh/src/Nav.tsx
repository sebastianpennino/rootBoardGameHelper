import { NavLink } from 'react-router-dom'
import { Methods } from './types'

export const AppNavigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink to="/" className={(n) => (n.isActive ? 'active' : '')}>
            Players & Methods
          </NavLink>
        </li>
        <li>
          <NavLink to="faction-selection" className={(n) => (n.isActive ? 'active' : '')}>
            M1: Random
          </NavLink>
        </li>
        <li>
          <NavLink to="manual-select" className={(n) => (n.isActive ? 'active' : '')}>
            M2: Pick
          </NavLink>
        </li>
        <li>
          <NavLink to="priority-select" className={(n) => (n.isActive ? 'active' : '')}>
            M3: Priority
          </NavLink>
        </li>
        <li>
          <NavLink to={`results?type=${Methods.RANDOM}`} className={(n) => (n.isActive ? 'active' : '')}>
            R: Rnd
          </NavLink>
        </li>
        <li>
          <NavLink to={`results?type=${Methods.PICK}`} className={(n) => (n.isActive ? 'active' : '')}>
            R: Pick
          </NavLink>
        </li>
        <li>
          <NavLink to={`results?type=${Methods.PRIORITY}`} className={(n) => (n.isActive ? 'active' : '')}>
            R: Priority
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
  )
}
