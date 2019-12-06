import React from "react";
import PropTypes from "prop-types";
import styles from "./FlightProperty.module.css";
import classnames from "classnames";

const propTypes = {
  /** property name */
  name: PropTypes.string.isRequired,
  /** optional className */
  className: PropTypes.string
};

const FlightProperty = ({ name, children, className }) => {
  return (
    <div className={classnames(styles.property, className)}>
      <div className={styles.name}>{name}</div>
      <p>{children}</p>
    </div>
  );
};

FlightProperty.propTypes = propTypes;
export default FlightProperty;
