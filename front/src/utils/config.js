const NODE_ENV = process.env.NODE_ENV
const DEV_URI = process.env.REACT_APP_DEV_URI
const BIKE_API_URI = (NODE_ENV === 'development' && DEV_URI) ? `${DEV_URI}/api`: './api'
const LOGIN_API_URI = process.env.REACT_APP_LOGIN_API_URI || 'http://localhost:3004'

export default {
    BIKE_API_URI,
    LOGIN_API_URI
}