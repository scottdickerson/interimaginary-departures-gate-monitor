import React from 'react'
import PropTypes from 'prop-types'
import { FlightDetailsCardPropTypes } from './FlightDetailsCard'
import styles from './FlightDetailsBoard.module.css'
import FlightDetailsCard from './FlightDetailsCard'
import logo from './imgs/InterimaginaryDepartures-logo.png'
import { useSelector } from 'react-redux'

const propTypes = {
    flights: PropTypes.arrayOf(PropTypes.shape(FlightDetailsCardPropTypes)),
}

const FetchingFlights = () => (
    <div className={styles.fetching}>Fetching Flights...</div>
)
const FetchingFlightError = () => (
    <div className={styles.error}>Error Fetching Flights</div>
)

/** Dumb render only component */
const FlightDetailsBoard = ({ flights }) => {
    const isFetching = useSelector((state) => state.flights.isFetching)
    const fetchingError = useSelector((state) => state.flights.error)
    return (
        <div className={styles.board}>
            <div className={styles.title}>
                <img alt="Interimaginary Departures" src={logo} />
            </div>

            <div className={styles.cards}>
                {isFetching ? (
                    <FetchingFlights></FetchingFlights>
                ) : fetchingError ? (
                    <FetchingFlightError />
                ) : (
                    flights.map((flight, index) => (
                        <FlightDetailsCard
                            key={flight.destination}
                            {...flight}
                            status={index === 0 ? 'Boarding' : flight.status}
                            showUnderline={false}
                            carrier={<img src={flight.carrier} alt="Carrier" />}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

FlightDetailsBoard.propTypes = propTypes

export default FlightDetailsBoard
