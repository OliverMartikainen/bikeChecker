const axios = require('axios')
const { NEXT_FETCH_WAIT } = require('../utils/config')

const CITYBIKES_URI = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'

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
 * @type {{
 *      lastFetchTime: Number, //this is to prevent spamming the open api --> only need to do this max 1 per minute
 *      stations: Array<bikeStation> //has all the station data
 * }}
 */
let BIKE_DATA = {
    lastFetchTime: 0,
    stations: []
}


const bikeGraphQlQuery = `
query {
    bikeRentalStations {
      name
      stationId
      bikesAvailable
      spacesAvailable
      realtime
      lat
      lon
      allowDropoff
    }
  }
`

/** Fetches last minutes bikestation data
 * lastFetchTime gives time when returned bikedata was received
 * Result approx 110 kb of json
 * @returns { Promise<{
 *      lastFetchTime: Number,
 *      stations: Array<bikeStation> 
 * }>}
 */
const getBikeData = async () => {
    const timeNow = new Date().valueOf()
    if (BIKE_DATA.lastFetchTime > timeNow - NEXT_FETCH_WAIT) {
        //return old data from database. --> u should store this in program memory... no need for db.
        return BIKE_DATA
    }

    try {
        // @ts-ignore
        const response = await axios.post(CITYBIKES_URI, { query: bikeGraphQlQuery })

        if (response.status === 200 && response?.data?.data?.bikeRentalStations) {
            console.log('UPDATED BIKE_DATA')
            BIKE_DATA = {
                lastFetchTime: timeNow,
                stations: response?.data?.data?.bikeRentalStations || []
            }
        } else {
            console.error('FAILED BIKE DATA UPDATE', response.status, response.data)
        }
    } catch (error) {
        console.error(error)
    }
    /*error or no error, return BIKE_DATA.
     if all ok update BIKE_DATA & then return it, else just return what u got */
    return BIKE_DATA
}


module.exports = {
    getBikeData
}