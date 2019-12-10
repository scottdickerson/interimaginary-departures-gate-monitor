import React, { useEffect, useState, Fragment } from "react";
import "./App.css";
import FlightDetailsBoard from "./FlightDetailsBoard";
import FlightDelayTimer from "./FlightDelayTimer";
import moment from "moment";
import findIndex from "lodash/findIndex";
import omit from "lodash/omit";
import { fetchFlights } from "./FlightsAPI";

const DEFAULT_FLIGHT_SEPARATION = 1;

function App() {
  const [currentTime, setCurrentTime] = useState(moment().valueOf());
  const [flights, setFlights] = useState([]);

  const loadAndSetFlights = (separation = DEFAULT_FLIGHT_SEPARATION) => {
    fetchFlights(separation).then(
      (
        flights // start the flights every 3 minutes
      ) => {
        console.log(
          `flights response ${JSON.stringify(
            flights.map(flight => omit(flight, ["carrier"])),
            null,
            2
          )}`
        );
        setFlights(flights);
      }
    );
  };

  const nextFlight = findIndex(flights, flight => {
    console.log(
      `flight departureTime ${flight.departureTime} currentTime ${currentTime}`
    );
    return flight.departureTime >= currentTime;
  });

  // load the flights data if we can't find the next flight
  useEffect(() => {
    if (nextFlight < 0) {
      loadAndSetFlights();
    }
  }, [setFlights, nextFlight]);

  // update the current time every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().valueOf());
    }, 30000);
    return () => clearInterval(interval);
  }, [setCurrentTime]);

  return (
    <Fragment>
      <FlightDelayTimer
        defaultDelay={DEFAULT_FLIGHT_SEPARATION}
        onChange={delay => loadAndSetFlights(delay)}
      />
      <FlightDetailsBoard flights={flights.slice(nextFlight, nextFlight + 2)} />
    </Fragment>
  );
}

export default App;
