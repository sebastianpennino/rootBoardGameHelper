import { Link, Outlet } from "react-router-dom";

export function Users({ users }: any) {
  return (
    <>
      <h2>Users</h2>

      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            <Link to={user.id}>{user.fullName}</Link>
          </li>
        ))}
      </ul>

      <Outlet />
    </>
  );
};
