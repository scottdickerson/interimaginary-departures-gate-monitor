import React from "react";
import FlightDetailsHeader from "../FlightDetailsHeader";
import testImage from "../imgs/Wistful.png";

export default {
  title: "Flight Details Header"
};

export const flightDetails = () => (
  <FlightDetailsHeader
    status="On Time"
    carrier={<img alt="carrier" src={testImage} />}
    departureTime={1575663740}
  />
);
