import config from 'utils/config'
import axios from 'axios'
import tokenManager from 'utils/tokenManager'

const CREATE_URI = `${config.LOGIN_API_URI}/api/users`
const LOGIN_URI = `${config.LOGIN_API_URI}/api/login`
const HOMESTATION_URI = `${config.LOGIN_API_URI}/api/storeStation`


const login = async (username, password) => {
    try {
        const response = await axios.post(LOGIN_URI, { username, password })
    
        if(response.status !== 201 || !response.data ) {
            console.log('LOGIN: FAILED', response.status)
            return { isLoggedIn: false }
        }
    
        console.log('LOGIN DONE')

        const token = response.data.token
        if(token) {
            tokenManager.setToken(token)
        }

        if(response.data.token !== '') window.localStorage.setItem('userToken', response.data.token)

        return { isLoggedIn: true, station: response.data.station}
    } catch (error) {
        console.error('LOGIN: FAILED',error.message)
        return { isLoggedIn: false }
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
        console.error(error.message)
        return { bCreated: false, message: 'USERNAME IN USE' }
    }
}

const storeHomeStation = async (homeStation) => {
    try {
        const data = {
            station: homeStation
        }
        console.log(data)
        const AuthorizationHeader = tokenManager.getAuthHeader()
        await axios.post(HOMESTATION_URI, data, AuthorizationHeader)

    } catch (error) {
        console.error(error.message)
    }
}


export default {
    login,
    createUser,
    storeHomeStation
}
