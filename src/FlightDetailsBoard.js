import React from "react";
import PropTypes from "prop-types";
import { FlightDetailsCardPropTypes } from "./FlightDetailsCard";
import styles from "./FlightDetailsBoard.module.css";
import FlightDetailsCard from "./FlightDetailsCard";
import logo from "./imgs/InterimaginaryDepartures-logo.png";

const propTypes = {
  flights: PropTypes.arrayOf(PropTypes.shape(FlightDetailsCardPropTypes))
};

/** Dumb render only component */
const FlightDetailsBoard = ({ flights }) => {
  return (
    <div className={styles.board}>
      <div className={styles.title}>
        <img alt="Interimaginary Departures" src={logo} />
      </div>
      <div className={styles.cards}>
        {flights.map(flight => (
          <FlightDetailsCard key={flight.destination} {...flight} />
        ))}
      </div>
    </div>
  );
};

FlightDetailsCardPropTypes.propTypes = propTypes;

export default FlightDetailsBoard;
