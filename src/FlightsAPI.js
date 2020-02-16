import { normalizeFlight } from "./dataUtils";
import moment from "moment";
import qs from 'qs';

export const fetchFlights = day =>
  fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8080/flights?${qs.stringify({day})}`, {
    method: "get",
    url: `http://${process.env.REACT_APP_SERVER_HOST}:8080`
  }).then(response => {
    console.log("fetch response");
    return response.json().then(flights =>
      flights.map((flight, index) => ({
        ...normalizeFlight(flight),
        departureTime: moment(flight.departureTime).valueOf()
      }))
    );
  });
