import React, { useState } from 'react'
import userService from 'services/user'

import './LoginScreen.css'

/**
 * @typedef {import('services/bikeData').bikeStation } bikeStation
 */

 const homeStationKeys = [
     'name', 
     'lat',
     'lon',
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

        const { isLoggedIn, station } = await userService.login(username, password)
        if (isLoggedIn) {
            //read homestation from database and add it to localstorage --> SituationScreen then reads from there
            console.log(homeStationKeys.every(key => station[key]))
            if (station && homeStationKeys.every(key => station[key])) {
                const { 
                    name, 
                    lat,
                    lon,
                } = station
                try {
                    const storedStation = {
                        name,
                        stationId: null,
                        bikesAvailable: null,
                        spacesAvailable: null,
                        realtime: null,
                        lat,
                        lon,
                        allowDropoff: null,
                        lastFetchTime: 0
                    }
                    window.localStorage.setItem('centerStation', JSON.stringify(storedStation))
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