import React, { useState, useEffect } from 'react'
import bikeDataService from 'services/bikeData'
import StationList from './StationList'

/**
 * @typedef {import('services/bikeData').bikeStation } bikeStation
 */



const distanceCalc = (point1, point2) => {
    const { lat: lat1, lon: lon1 } = point1
    const { lat: lat2, lon: lon2 } = point2


    /* Distance calculation algo copy paster from 
    https://www.movable-type.co.uk/scripts/latlong.html */

    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d
}


const updateBikeData = async (setBikeData) => {
    console.log('a')
    const bikeData = await bikeDataService.getBikeData()
    if (!bikeData || bikeData.lastFetchTime === 0 || bikeData.stations.length === 0) {
        return
    }
    const { lastFetchTime, stations } = bikeData
    setBikeData({ lastFetchTime, stations })
}


const getStoredStationCenter = () => {
    try {
        const storedStation = window.localStorage.getItem('centerStation')
        if (storedStation) return JSON.parse(storedStation)
        return undefined
    } catch (error) {
        return undefined
    }
}

const SituationScreen = () => {
    const [bikeData, setBikeData] = useState({ lastFetchTime: 0, stations: [] })
    const [center, setCenter] = useState(() => getStoredStationCenter())
    const [showStationList, setShowStationList] = useState((!center ? true : false))

    /**
     * @type { { lastFetchTime: Number, stations: Array<bikeStation> } }
     */
    const { lastFetchTime, stations } = bikeData

    useEffect(() => {
        updateBikeData(setBikeData)
        const updateTicker = setInterval(() => {
            updateBikeData(setBikeData)
        }, 10 * 1000)
        return () => {console.log('ceä'); clearTimeout(updateTicker)}
    }, [])


    return (
        <div id='station-screen'>
            {center.name}
            <br></br>

            <button onClick={() => setShowStationList(state => !state)}>CHANGE STATION</button>
            <br></br>
            { showStationList && <StationList center={center} setCenter={setCenter} stations={stations} />}

        </div >
    )
}

export default SituationScreen