import React, { useEffect, useState } from "react";
import "./App.css";
import { flights } from "./stories/sampleData";
import FlightDetailsBoard from "./FlightDetailsBoard";

function App() {
  const [currentFlights, setCurrentFlights] = useState(flights);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("reset state");
      setCurrentFlights(currentFlights => currentFlights.reverse());
    }, 1000);
    return () => clearInterval(interval);
  }, [currentFlights]);
  return <FlightDetailsBoard flights={currentFlights} />;
}

export default App;
