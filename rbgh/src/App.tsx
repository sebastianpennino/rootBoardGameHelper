import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {
  PlayerSelection,
  MethodSelection,
  Results,
  NoMatch,
  Topics,
  Users,
  User,
} from "./tabs";

function App() {

  const users = [
    { id: "1", fullName: "T'Challa" },
    { id: "2", fullName: "Miles Morales" },
    { id: "3", fullName: "James Howlett" },
  ];

  return (
    <div className="App">
      <Router>

      <div className="list">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="step1">Page 1</Link>
            </li>
            <li>
              <Link to="step2">Page 2</Link>
            </li>
            <li>
              <Link to="step3">Page 3</Link>
            </li>
            <li>
              <Link to="topics">topics</Link>
            </li>
            <li>
              <Link to="users">users</Link>
            </li>
          </ul>
        </div>

        <Routes>
          <Route index element={<h1>Home Page</h1>} />
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
  );
}

export default App;
