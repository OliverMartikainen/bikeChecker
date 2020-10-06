import React, { useState } from 'react'
import userService from 'services/user'

import './LoginScreen.css'

/**
 * @typedef {import('services/bikeData').bikeStation } bikeStation
 */

 const homeStationKeys = [
     'id',
     'user_id',
     'name', 
     'bikes_available',
     'spaces_available',
     'realtime',
     'lat',
     'lon',
     'allow_drop_off',
     'last_fetch_time',
    ]


const LoginScreen = ({ setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    const userLoginHandler = async (event) => {
        event.preventDefault()
        if (username === '' || password === '') {
            console.log('MISSIN USERNAME OR PASSWORD')
            setErrorMessage('MISSIN USERNAME OR PASSWORD')
            setTimeout(() => { setErrorMessage('') }, 5000)
            return
        }

        const { isLoggedIn, homeStation } = await userService.login(username, password)
        if (isLoggedIn) {
            //read homestation from database and add it to localstorage --> SituationScreen then reads from there
            if (homeStation && homeStationKeys.every(key => homeStation[key])) {
                const { 
                    name, 
                    id, 
                    last_fetch_time, 
                    bikes_available, 
                    spaces_available, 
                    realtime, 
                    lat,
                    lon,
                    allow_drop_off
                } = homeStation
                try {
                    const station = {
                        name,
                        stationId: id,
                        bikesAvailable: bikes_available,
                        spacesAvailable: spaces_available,
                        realtime,
                        lat,
                        lon,
                        allowDropoff: allow_drop_off,
                        lastFetchTime: last_fetch_time
                    }
                    window.localStorage.setItem('centerStation', JSON.stringify(station))
                } catch (error) {
                    console.error(error)
                }
            }

            window.localStorage.setItem('storedUser', username)
            setUser(username)
        } else {
            console.log('LOGIN FAILED')
            setErrorMessage('INVALID USER INFORMATION')
            setTimeout(() => { setErrorMessage('') }, 5000)
        }
    }

    const userCreateHandler = async (event) => {
        event.preventDefault()
        if (username === '' || password === '') {
            console.log('MISSIN USERNAME OR PASSWORD')
            setErrorMessage('MISSIN USERNAME OR PASSWORD')
            setTimeout(() => { setErrorMessage('') }, 5000)
            return
        }
        const { bCreated, message } = await userService.createUser(username, password)
        if (bCreated) {
            window.localStorage.setItem('storedUser', username)
            setUser(username)
        } else {
            console.log('LOGIN FAILED')
            setErrorMessage(message)
            setTimeout(() => { setErrorMessage('') }, 5000)
        }
    }

    return (
        <div id='login-screen'>
            <form onSubmit={userLoginHandler}>
                USERNAME: <input
                    onChange={(event) => setUsername(event.target.value)}
                    value={username}
                    name='username'
                />
                <br></br>
                PASSWORD: <input
                    type='password'
                    onChange={(event) => setPassword(event.target.value)}
                    name='password'
                    value={password}
                />
                <br></br>

                <br></br>

                <button type='submit' >LOGIN USER</button>
                <button type='button' onClick={userCreateHandler}>CREATE USER</button>
                <br></br>
                <br></br>
                {errorMessage}<br></br>
            </form>
        </div>
    )
}

export default LoginScreen