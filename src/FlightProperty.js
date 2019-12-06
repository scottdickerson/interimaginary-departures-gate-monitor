import React from "react";
import PropTypes from "prop-types";
import styles from "./FlightProperty.module.css";

const propTypes = {
  /** property name */
  name: PropTypes.string.isRequired
};

const FlightProperty = ({ name, children }) => {
  return (
    <div className={styles.property}>
      <div className={styles.name}>{name}</div>
      <p>{children}</p>
    </div>
  );
};

FlightProperty.propTypes = propTypes;
export default FlightProperty;
