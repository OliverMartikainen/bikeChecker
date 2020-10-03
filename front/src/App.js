import React, { useEffect, useState } from 'react';
import './App.css';

import StationList from './components/StationList'

const getStoredStationCenter = () => {
  try {
    const storedStation = window.localStorage.getItem('centerStation')
    if(storedStation) return JSON.parse(storedStation) 
    return undefined
  } catch (error) {
    return undefined
  }
}


const App = () => {
  const [center, setCenter] = useState(() => getStoredStationCenter())

  return (
    <div className="App">
      <h1>HELLO WORLD</h1>
      <br></br>
      <StationList center={center} setCenter={setCenter} />
    </div>
  )
}

export default App;
