import React from "react";
import PropTypes from "prop-types";
import { FlightDetailsCardPropTypes } from "./FlightDetailsCard";
import styles from "./FlightDetailsBoard.module.css";
import FlightDetailsCard from "./FlightDetailsCard";
import logo from "./imgs/InterimaginaryDepartures-logo.png";

const propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape(FlightDetailsCardPropTypes))
};

/** Dumb render only component */
const FlightDetailsBoard = ({ cards }) => {
  return (
    <div className={styles.board}>
      <div className={styles.title}>
        <img alt="Interimaginary Departures" src={logo} />
      </div>
      <div className={styles.cards}>
        {cards.map(card => (
          <FlightDetailsCard {...card} />
        ))}
      </div>
    </div>
  );
};

FlightDetailsCardPropTypes.propTypes = propTypes;

export default FlightDetailsBoard;
