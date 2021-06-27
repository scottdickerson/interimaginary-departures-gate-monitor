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

// const DEFAULT_FLIGHT_SEPARATION = 0;

/**
 * NOTE: all the flight delay stuff (setFlightDelay) is for the test mode where we run across all the times
 * @returns
 */
function App() {
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

    // // If the flight delay changes restart the time at 5 am TEST_MODE
    // useEffect(()=> {
    //   if (flightDelay > 0) {
    //     loadAndSetFlights(7); // special request for alphabetical flights
    //     setCurrentTime(moment().hour(4).minute(55).second(0).millisecond(0).valueOf())
    //   }
    // }, [flightDelay])

    // update the current time every 10 seconds
    useEffect(() => {
        const interval = setInterval(
            () => {
                setCurrentTime((currentTime) =>
                    // flightDelay    //TEST_MODE
                    //   ? moment(currentTime)
                    //       .add(3.5, "minutes")
                    //       .valueOf()
                    //   :
                    moment().valueOf()
                )
                setCurrentDay(moment().day())
            },
            // flightDelay !== 0 ? flightDelay * 1000 :  //TEST_MODE
            10000
        )
        return () => clearInterval(interval)
    }, [
        // flightDelay, TEST_MODE
        setCurrentTime,
    ])

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
                    !isEmpty(displayedFlights) &&
                    displayedFlights[0].destination
                }
                flightStatus={
                    !isEmpty(displayedFlights) && displayedFlights[0].status
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
