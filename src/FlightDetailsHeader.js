import React from "react";
import PropTypes from "prop-types";
import styles from "./FlightDetailsHeader.module.css";
import moment from "moment";
import FlightProperty from "./FlightProperty";

const propTypes = {
  /** current flight status indicator */
  status: PropTypes.oneOf(["scheduled", "now boarding", "canceled"]).isRequired,
  /** usually a picture that describes the flight carrier */
  carrier: PropTypes.node.isRequired,
  /** timestamp of the departure time */
  departureTime: PropTypes.number.isRequired
};

const FlightDetailsHeader = ({ status, carrier, departureTime }) => {
  return (
    <div className={styles.header}>
      <div>
        <div className={styles.status}>{status}</div>
      </div>
      <div>
        <FlightProperty name="Carrier">Wistful</FlightProperty>
      </div>
      <div className={styles.departureTime}>
        <FlightProperty name="Departure time">
          {moment(departureTime).format("hh:mm a")}
        </FlightProperty>
      </div>
    </div>
  );
};

FlightDetailsHeader.propTypes = propTypes;

export default FlightDetailsHeader;
