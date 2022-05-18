import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

export function Topics() {
  return (
    <div>
      <h2>Topics</h2>

      <nav>
        <ul>
          <li>
            <Link to="random1">random11nm</Link>
          </li>
          <li>
            <Link to="what2">whath2</Link>
          </li>
        </ul>
      </nav>

      <Outlet />

      {/*https://www.robinwieruch.de/react-router-nested-routes/*/}
    </div>
  )
}
