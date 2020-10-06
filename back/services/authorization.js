const axios = require('axios')
const { VERIFY_URI } = require('../utils/config')

/** Verifies token and returns true if ok
 * @returns { Promise<Boolean>}
    */
const verifyToken = async (token) => {
    try {
        // @ts-ignore
        const response = await axios.post(`${VERIFY_URI}/api/verifyToken`, { token: token })
        if(response.status === 204) {
            console.log('TOKEN VERIFIED')
            return true
        } else {
            console.log('TOKEN REJECTED', response.status)
        }
    } catch (error) {
        console.error(error.message, error.status)
    }
    /*error or no error, return BIKE_DATA.
     if all ok update BIKE_DATA & then return it, else just return what u got */
    return false
}


module.exports = {
    verifyToken
}