import React from "react";
import FlightDetailsHeader from "../FlightDetailsHeader";
// import testImage from "../imgs/Wistful.png";
//<img alt="carrier" src={testImage} />

export default {
  title: "Flight Details Header"
};

export const flightDetails = () => (
  <FlightDetailsHeader
    status="now boarding"
    carrier="carrier"
    departureTime={1575663740}
  />
);
