import React, { useEffect, useState } from 'react';
import './App.css';

import SituationScreen from './components/SituationScreen'
import LoginScreen from './components/LoginScreen'




const App = () => {
  const [user, setUser] = useState()

  return (
    <div className="App">
      <h1>HSL CITYBIKE CHECKER</h1>
      <br></br>
      {
        !user
          ?
          <LoginScreen setUser={setUser} />
          :
          <SituationScreen />
      }
    </div>
  )
}

export default App;
