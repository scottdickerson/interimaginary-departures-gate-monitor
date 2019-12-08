import React, { useEffect, useState } from "react";
import "./App.css";
import { flights } from "./stories/sampleData";
import FlightDetailsBoard from "./FlightDetailsBoard";
import moment from "moment";
import findIndex from "lodash/findIndex";
function App() {
  const [currentTime, setCurrentTime] = useState(1575824400000);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(currentTime => {
        console.log(`currentTime ${currentTime}`);
        // If we're on the last one, then reset, otherwise increment by 30 minutes
        return currentTime >= 1575833400000
          ? 1575824400000
          : moment(currentTime)
              .add(30, "minutes")
              .valueOf();
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [setCurrentTime]);

  const nextFlight = findIndex(flights, flight => {
    console.log(
      `flight departureTime ${flight.departureTime} currentTime ${currentTime}`
    );
    return flight.departureTime >= currentTime;
  });

  return (
    <FlightDetailsBoard
      flights={flights
        .slice(nextFlight, nextFlight + 2)
        .map((flight, index) =>
          index === 0 ? { ...flight, status: "now boarding" } : flight
        )}
    />
  );
}

export default App;
