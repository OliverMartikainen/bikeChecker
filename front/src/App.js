import React, { useEffect, useState } from 'react';
import './App.css';

import StationList from './components/StationList'
import LoginScreen from './components/LoginScreen'

const getStoredStationCenter = () => {
  try {
    const storedStation = window.localStorage.getItem('centerStation')
    if (storedStation) return JSON.parse(storedStation)
    return undefined
  } catch (error) {
    return undefined
  }
}


const App = () => {
  const [center, setCenter] = useState(() => getStoredStationCenter())
  const [user, setUser] = useState('as')

  return (
    <div className="App">
      <h1>HSL CITYBIKE CHECKER</h1>
      <br></br>
      {
        !user
          ?
          <LoginScreen setUser={setUser} />
          :
          <StationList center={center} setCenter={setCenter} />
      }
    </div>
  )
}

export default App;
