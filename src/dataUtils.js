import airlinguist from "./imgs/airlinguist.png";
import airudite from "./imgs/airudite.png";
import arslonga from "./imgs/arslonga.png";
import dystopiair from "./imgs/dystopiair.png";
import gobelow from "./imgs/gobelow.png";
import gossamerica from "./imgs/gossamerica.png";
import incorporeal from "./imgs/incorporeal.png";
import janeair from "./imgs/janeair.png";
import oddyssey from "./imgs/oddyssey.png";
import panache from "./imgs/panache.png";
import quantum from "./imgs/quantum.png";
import spellbound from "./imgs/spellbound.png";
import untitledairlines from "./imgs/untitledairlines.png";
import utopiair from "./imgs/utopiair.png";
import wistful from "./imgs/wistful.png";

// audio files
import abame from './sound/announcement-abame.mp3';
import ankhmorpark from './sound/announcement-ankhmorpark.mp3';
import asteroidb612 from './sound/announcement-asteroid612.mp3';
import cimeria from './sound/announcement-cimeria.mp3';
import cityofbrass from './sound/announcement-cityofbrass.mp3';
import cyberspace from './sound/announcement-cyberspace.mp3';

const imagepaths = {
  airlinguist,
  airudite,
  arslonga,
  dystopiair,
  gobelow,
  gossamerica,
  incorporeal,
  janeair,
  oddyssey,
  panache,
  quantum,
  spellbound,
  untitledairlines,
  utopiair,
  wistful
};

const audioPaths = {
    abame,
    ankhmorpark,
    asteroidb612,
    cimeria,
    cityofbrass,
    cyberspace
}

/**
 *
 * @param {*} flight a flight object in the csv looks like this
 * Location Name: 'Abame',
 * Category 1: 'Environment'
 * Narrative 1: 'Colonized',
 * ... until Category 4 and Narrative 4,
 * FIDS Status: 'Canceled', 'On Time', or 'Delayed'
 * Airline: 'PANACHE'
 */
export const normalizeFlight = flight => {
  return {
    destination: flight["Location Name"],
    status: flight["Departure Status"],
    carrier: imagepaths[flight["Airline"].replace(/ .*/, "").toLowerCase()],
    details: [
      { name: flight["Category 1"], value: flight["Narrative 1"] },
      { name: flight["Category 2"], value: flight["Narrative 2"] },
      { name: flight["Category 3"], value: flight["Narrative 3"] },
      { name: flight["Category 4"], value: flight["Narrative 4"] }
    ],
    departureTime: flight.departureTime
  };
};

/** find the right audio file for a destination */
export const findAudio = destination =>  {
  // strip all special characters from the destination
  var audioNames = Object.keys(audioPaths)
  
  // if I can't find the matching file return a random path
  return audioPaths[destination.replace(/[\W_]+/g,"").toLowerCase()] || audioPaths[audioNames[ audioNames.length * Math.random() << 0]];
}