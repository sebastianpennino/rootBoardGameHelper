import { Link, useParams } from 'react-router-dom'

export function User() {
  const { userId } = useParams()

  return (
    <>
      <h2>User ID: {userId}</h2>

      <Link to="/users">Back to Users</Link>
    </>
  )
}
