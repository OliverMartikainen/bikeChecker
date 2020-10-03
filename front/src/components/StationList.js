import React, { useState, useEffect } from 'react'
import bikeDataService from 'services/bikeData'

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
        console.log('NO DATA')
        return
    }
    const { lastFetchTime, stations } = bikeData
    setBikeData({ lastFetchTime, stations })
}

const StationItem = ({ station, selectCenter }) => {
    const {
        name,
        stationId,
        bikesAvailable,
        spacesAvailable,
        lat,
        lon,
    } = station

    const totalSpace = bikesAvailable + spacesAvailable
    const bikes = `${bikesAvailable}/${totalSpace}`

    return (
        <tr onDoubleClick={() => selectCenter(station)}>
            <td>
                {name}
            </td>
            <td>
                {bikes}
            </td>
        </tr>
    )
}

const CenterSation = ({ center = { name: 'NO CENTER SELECTED', bikesAvailable: 0, spacesAvailable: 0} }) => {
    const {
        name,
        bikesAvailable,
        spacesAvailable,
    } = center

    const totalSpace = bikesAvailable + spacesAvailable
    const bikes = `${bikesAvailable}/${totalSpace}`

    return (
        <table>
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

const StationList = ({ center, setCenter }) => {
    const [bikeData, setBikeData] = useState({ lastFetchTime: 0, stations: [] })
    const [nameCriteria, setNameCriteria] = useState('')

    /**
     * @type { { lastFetchTime: Number, stations: Array<bikeStation> } }
     */
    const { lastFetchTime, stations } = bikeData

    useEffect(() => {
        updateBikeData(setBikeData)
    }, [])

    const onFilterChange = (event) => setNameCriteria(event.target.value)

    const selectCenter = (station) => {
        window.localStorage.setItem('centerStation', JSON.stringify(station))
        setCenter(station)
    }

    const nameCriteriaLower = nameCriteria.toLowerCase()
    const filteredStations = stations.filter(s => s.name.toLowerCase().includes(nameCriteriaLower))
    const tableSatitons = filteredStations.map(s => <StationItem
        key={s.stationId}
        station={s}
        selectCenter={selectCenter}
    />)

    return (
        <div>
            <h2>CENTER STATION</h2>
            <CenterSation center={center} />
            <br></br>
            <input onChange={onFilterChange} value={nameCriteria} />
            <br></br>
            Select Station as Center with double click
            <br></br>
            <table>
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
                    {tableSatitons}
                </tbody>
            </table>
        </div>
    )
}

export default StationList