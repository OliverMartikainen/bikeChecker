import config from 'utils/config'
import axios from 'axios'

const URI = `${config.LOGIN_API_URI}/user`

let TOKEN = ''


const login = async (username, password) => {
    try {
        const response = await axios.post(URI, { username, password })
    
        if(response.status !== 200 || !response.data || !response.data.token) {
            console.log('LOGIN: FAILED', response.status)
            return false
        }
    
        console.log('LOGIN DONE')
        TOKEN = response.data.token || ''

        if(response.data.token !== '') window.localStorage.setItem('userToken', response.data.token)
        
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export default {
    login
}