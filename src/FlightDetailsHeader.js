import React from "react";
import PropTypes from "prop-types";
import styles from "./FlightDetailsHeader.module.css";
import classnames from "classnames";
import moment from "moment";
import FlightProperty from "./FlightProperty";
import VerticalLine from "./VerticalLine";

export const FlightDetailsHeaderPropTypes = {
  /** current flight status indicator */
  status: PropTypes.oneOf(["Now Boarding", "Scheduled", "Canceled"]).isRequired,
  /** usually a picture that describes the flight carrier */
  carrier: PropTypes.node.isRequired,
  /** timestamp of the departure time */
  departureTime: PropTypes.number.isRequired
};

const FlightDetailsHeader = ({ status, carrier, departureTime, className }) => {
  return (
    <div className={classnames(styles.header, className)}>
      <div>
        <div className={styles.status}>{status}</div>
      </div>
      <div>
        <FlightProperty name="Carrier">{carrier}</FlightProperty>
      </div>
      <VerticalLine></VerticalLine>
      <div className={styles.departureTime}>
        <FlightProperty name="Departure time">
          {moment(departureTime).format("h:mm a")}
        </FlightProperty>
      </div>
    </div>
  );
};

FlightDetailsHeader.propTypes = FlightDetailsHeaderPropTypes;

export default FlightDetailsHeader;
