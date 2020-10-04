import React, { useState } from 'react';
import './App.css';

import SituationScreen from './components/SituationScreen'
import LoginScreen from './components/LoginScreen'

const getStoredUser = () => {
  try {
    return window.localStorage.getItem('storedUser')
  } catch (error) {
    return null
  }
}


const App = () => {
  const [user, setUser] = useState(getStoredUser())

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const userText = user ? `USER: ${user}` : 'Login or Create New User'

  return (
    <div className="App">
      <h1>HSL CITYBIKE CHECKER</h1>
      <h3>{userText}</h3>
      {
        user
          ?
          <SituationScreen />
          :
          <LoginScreen setUser={setUser} />
      }
      <br></br>
      {
        user && <button onClick={logout}>LOGOUT</button>
      }
    </div>
  )
}

export default App;
