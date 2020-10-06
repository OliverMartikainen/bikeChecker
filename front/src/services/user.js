import config from 'utils/config'
import axios from 'axios'
import tokenManager from 'utils/tokenManager'

const CREATE_URI = `${config.LOGIN_API_URI}/api/users`
const LOGIN_URI = `${config.LOGIN_API_URI}/api/login`


const login = async (username, password) => {
    try {
        const response = await axios.post(LOGIN_URI, { username, password })
    
        if(response.status !== 201 || !response.data ) {
            console.log('LOGIN: FAILED', response.status)
            return false
        }
    
        console.log('LOGIN DONE')

        const token = response.data.token
        if(token) {
            tokenManager.setToken(token)
        }

        if(response.data.token !== '') window.localStorage.setItem('userToken', response.data.token)

        return true
    } catch (error) {
        console.error('LOGIN: FAILED',error.status)
        return false
    }
}

const createUser = async (username, password) => {
    if(!username || !password) {
        return { bCreated: false, message: 'MISSING USERNAME OR PASSWORD' }
    }
    try {
        const response = await axios.post(CREATE_URI, { username, password })
    
        if(response.status !== 201 || !response.data ) {
            console.log('LOGIN: FAILED', response.status)
            return { bCreated: false, message: 'USERNAME IN USE EXISTS'}
        }
    
        console.log('CREATED USER AND LOGGED IN DONE')

        const token = response.data.token
        if(token) {
            tokenManager.setToken(token)
        }

        if(response.data.token !== '') window.localStorage.setItem('userToken', response.data.token)

        return { bCreated: true, message: 'USER CREATED'}
    } catch (error) {
        console.error(error)
        return { bCreated: false, message: 'USERNAME IN USE' }
    }
}


export default {
    login,
    createUser
}
