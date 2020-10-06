import React, { useState } from 'react';
import './App.css';

import SituationScreen from './components/SituationScreen'
import LoginScreen from './components/LoginScreen'
import tokenManager from 'utils/tokenManager';

const getStoredUser = () => {
  try {
    const storedUser = window.localStorage.getItem('storedUser')
    const storedToken = window.localStorage.getItem('userToken')
    if(!storedUser || !storedToken) {
      window.localStorage.clear()
      return null
    }

    tokenManager.setToken(storedToken)

    return storedUser
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
