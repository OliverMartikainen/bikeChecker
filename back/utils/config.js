require('dotenv').config()

const PORT = process.env.PORT || 3001
const NODE_ENV = process.env.NODE_ENV
const SERVER_VERSION = process.env.npm_package_version || '0.0.1' // - package.json version - atm requires complete server restart - service version doesnt work with this?
const VERIFY_URI = process.env.VERIFY_URI
/* logging options */
const LOGGING_TYPE = process.env.LOGGING_TYPE || 'console' //'text' or 'console'. affects logging colorization

/* How often bike data can be updated from External api */
const NEXT_FETCH_WAIT = Number(process.env.NEXT_FETCH_WAIT) || 60 * 1000

module.exports = {
    PORT,
    NODE_ENV,
    LOGGING_TYPE,
    SERVER_VERSION,
    NEXT_FETCH_WAIT,
    VERIFY_URI
}