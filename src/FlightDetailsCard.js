import React from "react";
import PropTypes from "prop-types";
import styles from "./FlightDetailsCard.module.css";

import FlightDetailsHeader, {
  FlightDetailsHeaderPropTypes
} from "./FlightDetailsHeader";

import FlightProperty from "./FlightProperty";
import classnames from 'classnames';

export const FlightDetailsCardPropTypes = {
  ...FlightDetailsHeaderPropTypes,
  /** string or component describes the flight destination */
  destination: PropTypes.node.isRequired,
  /** additional details of the flight, the category names are not fixed! */
  details: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, value: PropTypes.node })
  ).isRequired,
  showUnderline: PropTypes.bool
};

const FlightDetailsCard = ({ destination, details, showUnderline, ...headerProps }) => {
  const flightProperties = [
    { name: "Destination", value: destination, className: styles.destination },
    ...details
  ];
  return (
    <div className={classnames(styles.card,{[styles.cardUnderline]: showUnderline} )}>
      <FlightDetailsHeader {...headerProps} className={styles.header} />
      {flightProperties.map(({ name, value, className }, index) => (
        <FlightProperty
          key={`${destination}-${name}`}
          name={name}
          className={classnames(styles.property, {[styles.propertyUnderline]: index !== flightProperties.length - 1})}
        >
          <div className={className || styles.propertyText}>{value}</div>
        </FlightProperty>
      ))}
    </div>
  );
};

FlightDetailsCard.propTypes = FlightDetailsCardPropTypes;
export default FlightDetailsCard;
