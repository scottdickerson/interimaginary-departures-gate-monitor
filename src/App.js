import React, { useEffect, useState, Fragment, useMemo } from 'react'
import './App.css'
import FlightDetailsBoard from './FlightDetailsBoard'
// import FlightDelayTimer from "./FlightDelayTimer";  // TEST_MODE
import FlightMusicPlayer from './FlightMusicPlayer'
import StartAudioPopup from './StartAudioPopup'
import moment from 'moment'
import findIndex from 'lodash/findIndex'
import omit from 'lodash/omit'
import sortBy from 'lodash/sortBy'
import isEmpty from 'lodash/isEmpty'
import { fetchFlights } from './api/FlightsAPI'

// const DEFAULT_FLIGHT_SEPARATION = 0;

/**
 * NOTE: all the flight delay stuff (setFlightDelay) is for the test mode where we run across all the times
 * @returns
 */
function App() {
    const [currentTime, setCurrentTime] = useState(moment().valueOf())
    // We're going to be allowed to let audio play on localhost because we're going to startup Chrome with a special flag
    const [audioCanPlay, setAudioCanPlay] = useState(false)
    const [flights, setFlights] = useState([])
    const [currentDay, setCurrentDay] = useState(moment().day())
    // const [flightDelay, setFlightDelay] = useState(DEFAULT_FLIGHT_SEPARATION); // TEST_MODE
    // reload the flights data if we switch days
    useEffect(() => {
        loadAndSetFlights(currentDay)
    }, [currentDay])

    // If we are not allowed to play audio, listen for the click to turn it on
    useEffect(() => {
        let clickListener
        if (!audioCanPlay) {
            clickListener = window.addEventListener('click', () =>
                setAudioCanPlay(true)
            )
        }
        return window.removeEventListener('click', clickListener)
    }, [audioCanPlay])

    const loadAndSetFlights = (day) => {
        fetchFlights(day).then((flights) => {
            console.log(
                `flights response ${JSON.stringify(
                    flights.map((flight) => omit(flight, ['carrier'])),
                    null,
                    2
                )}`
            )
            setFlights(sortBy(flights, 'departureTime'))
        })
    }

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
            {audioCanPlay ? (
                <FlightMusicPlayer
                    flightAnnouncement={
                        !isEmpty(displayedFlights) &&
                        displayedFlights[0].destination
                    }
                    flightStatus={
                        !isEmpty(displayedFlights) && displayedFlights[0].status
                    }
                />
            ) : null}
            {!audioCanPlay ? <StartAudioPopup /> : null}
            {/* <FlightDelayTimer
        defaultDelay={flightDelay}
        onChange={delay => setFlightDelay(delay)}
      /> */}
            <FlightDetailsBoard flights={displayedFlights} />
        </Fragment>
    )
}

export default App
