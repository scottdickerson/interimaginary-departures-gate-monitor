import React from "react";
import PropTypes from "prop-types";
import styles from "./FlightDetailsCard.module.css";

import FlightDetailsHeader, {
  FlightDetailsHeaderPropTypes
} from "./FlightDetailsHeader";

import FlightProperty from "./FlightProperty";

const propTypes = {
  ...FlightDetailsHeaderPropTypes,
  /** string or component describes the flight destination */
  destination: PropTypes.node.isRequired,
  /** additional details of the flight, the category names are not fixed! */
  details: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, value: PropTypes.node })
  ).isRequired
};

const FlightDetailsCard = ({ destination, details, ...headerProps }) => {
  const flightProperties = [
    { name: "Destination", value: destination, className: styles.destination },
    ...details
  ];
  return (
    <div className={styles.card}>
      <FlightDetailsHeader {...headerProps} className={styles.header} />
      {flightProperties.map(({ name, value, className }) => (
        <FlightProperty name={name} className={styles.property}>
          <span className={className}>{value}</span>
        </FlightProperty>
      ))}
    </div>
  );
};

FlightDetailsCard.propTypes = propTypes;
export default FlightDetailsCard;
