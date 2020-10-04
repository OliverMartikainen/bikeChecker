import React, { useState, useEffect } from 'react'
import bikeDataService from 'services/bikeData'
import StationList from './StationList'
import './SituationScreen.css'

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
    const bikeData = await bikeDataService.getBikeData()
    if (!bikeData || bikeData.lastFetchTime === 0 || bikeData.stations.length === 0) {
        return
    }
    const { lastFetchTime, stations } = bikeData
    setBikeData({ lastFetchTime, stations })
}


const getStoredStationCenter = () => {
    const defaultCenter = {
        name: 'NO CENTER SELECTED',
        bikesAvailable: 0,
        spacesAvailable: 0,
        stationId: null
    }
    try {
        const storedStation = window.localStorage.getItem('centerStation')
        if (storedStation) return JSON.parse(storedStation)
        return defaultCenter
    } catch (error) {
        return defaultCenter
    }
}

const CenterSation = ({ center }) => {
    const {
        name,
        bikesAvailable,
        spacesAvailable,
    } = center

    const totalSpace = bikesAvailable + spacesAvailable
    const bikes = `${bikesAvailable} / ${totalSpace}`

    let bikeSituation = 'bad'
    if (bikesAvailable > 3) bikeSituation = 'good'
    else if (bikesAvailable > 0) bikeSituation = 'neutral'

    return (
        <table id='center-table' className={bikeSituation}>
            <thead>
                <tr key={1} >
                    <th>
                        {'NAME'}
                    </th>
                    <th>
                        {'BIKES/SPACE'}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {name}
                    </td>
                    <td>
                        {bikes}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}


const SituationScreen = () => {
    const [bikeData, setBikeData] = useState({ lastFetchTime: 0, stations: [] })
    const [center, setCenter] = useState(() => getStoredStationCenter())
    const [showStationList, setShowStationList] = useState((!center.stationId ? true : false))

    /**
     * @type { { lastFetchTime: Number, stations: Array<bikeStation> } }
     */
    const { lastFetchTime, stations } = bikeData

    useEffect(() => {
        updateBikeData(setBikeData)
        const updateTicker = setInterval(() => {
            updateBikeData(setBikeData)
        }, 10 * 1000)
        return () => { clearTimeout(updateTicker) }
    }, [])

    const centerData = stations.find(s => s.stationId === center.stationId) || center

    const timeString = new Date(lastFetchTime || center.lastFetchTime).toLocaleString()

    const btnText = (showStationList) ? 'HIDE LIST' : 'CHANGE STATION'

    return (
        <div id='station-screen'>
            <div id='center-screen'>
                <h2>YOUR STATION</h2>
                <CenterSation center={centerData} />
                <br></br>
                {timeString}
            </div>
            <br></br>

            <button onClick={() => setShowStationList(state => !state)}>{btnText}</button>
            <br></br>

            { showStationList && <StationList
                centerId={center.stationId}
                setCenter={setCenter}
                stations={stations}
                lastFetchTime={lastFetchTime}
            />}
        </div >
    )
}

export default SituationScreen