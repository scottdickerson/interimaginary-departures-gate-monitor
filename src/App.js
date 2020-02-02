import React, { useEffect, useState, Fragment, useMemo } from "react";
import "./App.css";
import FlightDetailsBoard from "./FlightDetailsBoard";
import FlightDelayTimer from "./FlightDelayTimer";
import FlightMusicPlayer from "./FlightMusicPlayer";
import moment from "moment";
import findIndex from "lodash/findIndex";
import omit from "lodash/omit";
import sortBy from "lodash/sortBy";
import isEmpty from "lodash/isEmpty";
import { fetchFlights } from "./FlightsAPI";

const DEFAULT_FLIGHT_SEPARATION = 1;

function App() {
  const [currentTime, setCurrentTime] = useState(moment().valueOf());
  const [flights, setFlights] = useState([]);
  const [currentDay, setCurrentDay] = useState(moment().dayOfYear());
  // reload the flights data if we switch days
  useEffect(() => {
    loadAndSetFlights();
  }, [currentDay]);

  const loadAndSetFlights = (separation = DEFAULT_FLIGHT_SEPARATION) => {
    fetchFlights().then(
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
        setFlights(sortBy(flights, "departureTime"));
      }
    );
  };

  const nextFlight = findIndex(flights, flight => {
    return flight.departureTime > currentTime;
  });

  // update the current time every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().valueOf());
      setCurrentDay(moment().dayOfYear());
    }, 10000);
    return () => clearInterval(interval);
  }, [setCurrentTime]);

  const displayedFlights = useMemo(
    () =>
      flights.slice(nextFlight, nextFlight + 2).map((flight, index) => ({
        ...flight,
        status:
          flight.status === "Normal"
            ? index === 0
              ? "Now Boarding"
              : "Scheduled"
            : flight.status
      })),
    [flights, nextFlight]
  );

  return (
    <Fragment>
      <FlightMusicPlayer
        flightAnnouncement={
          !isEmpty(displayedFlights) && displayedFlights[0].destination
        }
      />
      <FlightDelayTimer
        defaultDelay={DEFAULT_FLIGHT_SEPARATION}
        onChange={delay => loadAndSetFlights(delay)}
      />
      <FlightDetailsBoard flights={displayedFlights} />
    </Fragment>
  );
}

export default App;
