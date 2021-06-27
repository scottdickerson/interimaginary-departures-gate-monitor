import { flightsReducer } from './api/FlightsReducer'
import { combineReducers } from 'redux'

export default combineReducers({ flights: flightsReducer })
