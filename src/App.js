import React, { useEffect, useState, Fragment, useMemo } from "react";
import "./App.css";
import FlightDetailsBoard from "./FlightDetailsBoard";
import FlightDelayTimer from "./FlightDelayTimer";
import moment from "moment";
import findIndex from "lodash/findIndex";
import omit from "lodash/omit";
import sortBy from "lodash/sortBy";
import { fetchFlights } from "./FlightsAPI";

const DEFAULT_FLIGHT_SEPARATION = 0;

function App() {
  const [currentTime, setCurrentTime] = useState(moment().valueOf());
  const [flights, setFlights] = useState([]);
  const [currentDay, setCurrentDay] = useState(moment().day());
  const [flightDelay, setFlightDelay] = useState(DEFAULT_FLIGHT_SEPARATION);
  // reload the flights data if we switch days
  useEffect(() => {
    loadAndSetFlights(currentDay);
  }, [currentDay]);

  const loadAndSetFlights = (day) => {
    fetchFlights(day).then(
      (
        flights
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

  // If the flight delay changes restart the time at 5 am
  useEffect(()=> {
    if (flightDelay > 0) {
      loadAndSetFlights(7); // special request for alphabetical flights
      setCurrentTime(moment().hour(4).minute(55).second(0).millisecond(0).valueOf())
    }
  }, [flightDelay])

  // update the current time every 5 seconds
  useEffect(() => {
    const interval = setInterval(
      () => {
        setCurrentTime(currentTime =>
          flightDelay
            ? moment(currentTime)
                .add(3.5, "minutes")
                .valueOf()
            : moment().valueOf()
        );
        setCurrentDay(moment().day());
      },
      flightDelay !== 0 ? flightDelay * 1000 : 10000
    );
    return () => clearInterval(interval);
  }, [flightDelay, setCurrentTime]);

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
     {/** <FlightMusicPlayer
        flightAnnouncement={
          !isEmpty(displayedFlights) && displayedFlights[0].destination
        }
        flightStatus={displayedFlights[0].status}
      />*/}
      <FlightDelayTimer
        defaultDelay={flightDelay}
        onChange={delay => setFlightDelay(delay)}
      />
      <FlightDetailsBoard flights={displayedFlights} />
    </Fragment>
  );
}

export default App;
