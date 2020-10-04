import React, { useState } from 'react'
import './StationList.css'

/**
 * @typedef {import('services/bikeData').bikeStation } bikeStation
 */

const StationItem = ({ station, selectCenter, isCenter }) => {
    const {
        name,
        bikesAvailable,
        spacesAvailable,
    } = station

    const totalSpace = bikesAvailable + spacesAvailable
    const bikes = `${bikesAvailable} / ${totalSpace}`
    const cssName = (isCenter) ? 'station-list-item center' : 'station-list-item'

    let bikeSituation = 'bad'
    if(bikesAvailable > 3) bikeSituation = 'good'
    else if(bikesAvailable > 0) bikeSituation = 'neutral'

    return (
        <tr className={cssName} onDoubleClick={() => selectCenter(station)}>
            <td>
                {name}
            </td>
            <td>
                {bikes}
            </td>
            <td>
                <div className={`status-marker ${bikeSituation}`} />
            </td>
        </tr>
    )
}

/**
 * 
 * @param { {
 *  centerId: String,
 *  setCenter: Function,
 *  stations: Array<bikeStation>,
 *  lastFetchTime: Number
 * } } params 
 */
const StationList = ({ centerId, setCenter, stations, lastFetchTime }) => {  
    const [nameCriteria, setNameCriteria] = useState('')

    if(stations.length === 0) {
        return (
            <div>
                <br></br>
                FETCHING DATA - WAIT A MOMENT
            </div>
        )
    }
    
    const onFilterChange = (event) => setNameCriteria(event.target.value)

    const selectCenter = (station) => {
        const storedStation = {
            lastFetchTime,
            ...station
        }
        window.localStorage.setItem('centerStation', JSON.stringify(storedStation))
        setCenter(storedStation)
    }

    const nameCriteriaLower = nameCriteria.toLowerCase()
    const filteredStations = stations.filter(s => s.name.toLowerCase().includes(nameCriteriaLower))
    const tableSatitons = filteredStations.map(s => <StationItem
        key={s.stationId}
        station={s}
        selectCenter={selectCenter}
        isCenter={s.stationId === centerId}
    />)

    return (
        <div>
            <br></br>
            FILTER STATIONS: <input onChange={onFilterChange} list='nameData' value={nameCriteria} type='search' />
            <br></br>
            Double Click to select
            <br></br>
            <br></br>
            <table id='station-list-table'>
                <thead>
                    <tr >
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
            <datalist id="nameData">
                {stations.map((s) =>
                    <option key={s.stationId} value={s.name} />
                )}
            </datalist>
        </div>
    )
}

export default StationList