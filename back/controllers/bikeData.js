const bikeDataRouter = require('express').Router()
const { getBikeData } = require('../services/hslCityBike')

/* This just sends all of BIKE_DATA to frontend. Data processing done client side.
Data is public so no need to limit in any way. 
Implement middleware to prevent too many fetches in 1 sec from same ip
Temprarily implement middleware to check for JSON token. Not needed once the 'project requirements are done'.
*/

bikeDataRouter.get('/', async (request, response) => {
    const ip = request.ip
    const agent = request.headers['user-agent']

    console.log('GET BIKEDATA: ', ip, agent)

    /*returns always an object, { lastFetchTime: Number, stations: []},
    time can be 0, array can be empty (no old fetches done and fetch failed now)*/
    const bikeData = await getBikeData()
    if(bikeData.stations.length === 0) {
        response.status(500).send({ error: 'NO DATA AVAILABLE. ERROR IN BACKEND'})
    } else {
        response.status(200).send({ bikeData })
    }
})




module.exports = bikeDataRouter