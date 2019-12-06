import testImage from "../imgs/wistful.png";
import testImage2 from "../imgs/airlinguist.png";
import faker from "faker";
import React from "react";
export const flights = [
  {
    status: "now boarding",
    carrier: <img alt="carrier" src={testImage} />,
    departureTime: 1575663740,
    destination: "Annares",
    details: [
      {
        name: "Distance",
        value: "Eleven years at light speed"
      },
      {
        name: "Long details",
        value: faker.lorem.paragraph()
      }
    ]
  },
  {
    status: "scheduled",
    carrier: <img alt="carrier" src={testImage2} />,
    departureTime: 1575663740,
    destination: "Brakebills",
    details: [
      {
        name: "Distance",
        value: "Four leagues and a labor"
      },
      {
        name: "Long details",
        value: faker.lorem.paragraph()
      }
    ]
  }
];
