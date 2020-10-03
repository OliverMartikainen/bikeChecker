const NODE_ENV = process.env.NODE_ENV
const DEV_URI = process.env.REACT_APP_DEV_URI
const API_URI = (NODE_ENV === 'development' && DEV_URI) ? `${DEV_URI}/api`: './api'

export default {
    API_URI
}