import config from 'utils/config'
import axios from 'axios'

const URI = `${config.API_URI}/bikeData`

/* prevent client from spamming updates --> server BIKE_DATA updates every 1 min */
let LAST_FETCH_TIME = 0

/**
 * @typedef {{
    name: String, //station name
    stationId: String, 
    bikesAvailable: 8, 
    spacesAvailable: Number,
    realtime: Boolean, //are bikes&spaces realtime numbers (true) or is bikesAvailable = spacesAvailable / 2 (false)
    lat: Number, //latitude
    lon: Number //longitude
    allowDropoff: Boolean //basically is it in action
 * }} bikeStation
 */

/**
 * @returns { Promise<?{ lastFetchTime: Number, stations: Array<bikeStation> }> }
 * Null if data fetch failed/no update available yet
 */
const getBikeData = async () => {
    const timeNow = new Date().valueOf()
    const minuteInMsec = 60 * 1000
    if(LAST_FETCH_TIME > timeNow - minuteInMsec) {
        console.log('BIKEDATA: TOO SOON TO DO NEW FETCH')
        return null
    }

    const response = await axios.get(URI)
    if(response.status !== 200 || !response.data || !response.data.bikeData) {
        console.log('BIKEDATA: FETCH FAILED', response.status)
        return null
    }

    const { lastFetchTime, stations } = response.data.bikeData
    LAST_FETCH_TIME = lastFetchTime
    return { lastFetchTime, stations }
}


export default {
    getBikeData
}
