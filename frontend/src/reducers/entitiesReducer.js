import { combineReducers } from "redux";
import events from './eventsReducer';

const EntitiesReducer = combineReducers ({
    events
});

export default EntitiesReducer;