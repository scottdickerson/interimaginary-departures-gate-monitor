import React from "react";
import FlightProperty from "../FlightProperty";

import testImage from "./testImage.png";

export default {
  title: "Flight Property"
};

export const stringValues = () => (
  <FlightProperty name="Destination">Antares</FlightProperty>
);

stringValues.story = {
  name: "String Values"
};

export const imageValue = () => (
  <FlightProperty name="Carrier">
    <img alt="bogus" src={testImage} />
  </FlightProperty>
);
