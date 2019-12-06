import React from "react";
import FlightDetailsCard from "../FlightDetailsCard";
import testImage from "../imgs/wistful.png";
import faker from "faker";

export default {
  title: "Flight Details Card"
};

export const flightDetails = () => (
  <FlightDetailsCard
    status="now boarding"
    carrier={<img alt="carrier" src={testImage} />}
    departureTime={1575663740}
    destination="Annares"
    details={[
      {
        name: "Distance",
        value: "Eleven years at light speed"
      },
      {
        name: "Long details",
        value: faker.lorem.paragraph()
      }
    ]}
  />
);
