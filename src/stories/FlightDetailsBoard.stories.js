import React from "react";
import FlightDetailsBoard from "../FlightDetailsBoard";
import { flights } from "./sampleData";

export default {
  title: "Flight Details Board"
};

export const flightDetails = () => <FlightDetailsBoard flights={flights} />;
