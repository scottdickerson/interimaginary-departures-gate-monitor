import React, { useEffect, useState, Fragment, useMemo } from 'react'
import './App.css'
import FlightDetailsBoard from './FlightDetailsBoard'
// import FlightDelayTimer from "./FlightDelayTimer";  // TEST_MODE
import FlightMusicPlayer from './FlightMusicPlayer'

import moment from 'moment'
import findIndex from 'lodash/findIndex'
import isEqual from 'lodash/isEqual'
import sortBy from 'lodash/sortBy'
import isEmpty from 'lodash/isEmpty'
import { fetchAllFlights } from './api/FlightsActions'
import { useSelector, useDispatch } from 'react-redux'

/**
 * NOTE: all the flight delay stuff (setFlightDelay) is for the test mode where we run across all the times
 * @returns
 */
function App() {
    // app runs in test mode quickly iterating through the items
    const TEST_MODE = window?.location?.pathname?.includes('/test')
    console.log('pathname', window?.location?.pathname)
    const [currentTime, setCurrentTime] = useState(moment().valueOf())
    const [currentDay, setCurrentDay] = useState(moment().day())
    const dispatch = useDispatch()
    // const [flightDelay, setFlightDelay] = useState(DEFAULT_FLIGHT_SEPARATION); // TEST_MODE
    // reload the flights data if we switch days
    useEffect(() => {
        dispatch(fetchAllFlights(currentDay))
    }, [currentDay, dispatch])

    const flights = useSelector(
        (state) => sortBy(state.flights.data || [], 'departureTime'),
        isEqual
    )

    const nextFlight = findIndex(flights, (flight) => {
        return flight.departureTime > currentTime
    })

    // update the current time every 10 seconds
    useEffect(() => {
        const interval = setInterval(
            () => {
                setCurrentTime((currentTime) =>
                    TEST_MODE // if we're in test mode don't use the real time
                        ? moment(currentTime).add(3.5, 'minutes').valueOf()
                        : moment().valueOf()
                )
                setCurrentDay(moment().day())
            },
            TEST_MODE ? 30000 : 10000
        )
        return () => clearInterval(interval)
    }, [TEST_MODE, setCurrentTime])

    const displayedFlights = useMemo(
        () =>
            flights.slice(nextFlight, nextFlight + 2).map((flight, index) => ({
                ...flight,
                status:
                    flight.status === 'Normal'
                        ? index === 0
                            ? 'Now Boarding'
                            : 'Scheduled'
                        : flight.status,
            })),
        [flights, nextFlight]
    )

    return (
        <Fragment>
            <FlightMusicPlayer
                flightAnnouncement={
                    !isEmpty(displayedFlights)
                        ? displayedFlights[0].destination
                        : null
                }
                flightStatus={
                    !isEmpty(displayedFlights)
                        ? displayedFlights[0].status
                        : null
                }
            />

            {/* <FlightDelayTimer
        defaultDelay={flightDelay}
        onChange={delay => setFlightDelay(delay)}
      /> */}
            <FlightDetailsBoard flights={displayedFlights} />
        </Fragment>
    )
}

export default App
