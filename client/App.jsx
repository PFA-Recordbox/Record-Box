import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./Home.jsx"
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

function App() {
  const [validUser, setValidUser] = useState(false);
  const [userCreds, setUserCreds] = useState({});

  return (
    <div id='App'>
      <Routes>
        <Route
          path='/'
          element={<Home validUser={validUser} userCreds={userCreds} />}
        />
        <Route
          path='login'
          element={
            <Login
              setValidUser={setValidUser}
              validUser={validUser}
              setUserCreds={setUserCreds}
            />
          }
        />
        <Route
          path='signup'
          element={
            <Signup
              setValidUser={setValidUser}
              validUser={validUser}
              setUserCreds={setUserCreds}
            />
          }
        />
      </Routes>
    </div>
  );

}

export default App;
