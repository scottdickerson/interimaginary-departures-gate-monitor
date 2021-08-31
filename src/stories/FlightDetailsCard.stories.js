import React from "react";
import FlightDetailsCard from "../FlightDetailsCard";
import testImage from "../imgs/Wistful.png";
import faker from "faker";
import { select } from "@storybook/addon-knobs";

export default {
  title: "Flight Details Card"
};
 
export const flightDetails = () => (
  <FlightDetailsCard
    status="On Time"
    carrier={<img alt="carrier" src={testImage} />}
    departureTime={1575663740}
    destination={select('destination',['Abame','Absurdistan', 'West Egg','Neverwhere', 'New Crobuzon','The Night Kitchen'],'Abame')}
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
