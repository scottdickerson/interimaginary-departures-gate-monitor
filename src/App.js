import React from "react";
import "./App.css";
import { cards } from "./stories/FlightDetailsBoard.stories";
import FlightDetailsBoard from "./FlightDetailsBoard";

function App() {
  return <FlightDetailsBoard cards={cards} />;
}

export default App;
