import React, { useEffect, useState } from 'react'
import userService from 'services/user'

import './LoginScreen.css'

const LoginScreen = ({ setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    const userSubmitHandler = async (event) => {
        event.preventDefault()
        if (username === '' || password === '') {
            console.log('MISSIN USERNAME OR PASSWORD')
            setErrorMessage('MISSIN USERNAME OR PASSWORD')
            setTimeout(() => {setErrorMessage('')}, 5000)
            return
        }
        const success = await userService.login(username, password)
        if (success) {
            setUser(username)
        } else {
            console.log('LOGIN FAILED')
            setErrorMessage('INVALID USER INFORMATION')
            setTimeout(() => {setErrorMessage('')}, 5000)
        }
    }

    return (
        <div id='login-screen'>
            <form onSubmit={userSubmitHandler}>
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

                <button type='submit'>LOGIN</button>
                <br></br>
                <br></br>
                {errorMessage}<br></br>
            </form>
            
        </div>
    )
}

export default LoginScreen