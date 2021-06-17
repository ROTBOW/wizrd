import {
  RECEIVE_EVENT_ERRORS,
  RECEIVE_ALL_EVENTS,
  RECEIVE_EVENT
} from '../actions/eventsActions';

const eventErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_EVENT_ERRORS:
      return action.errors;
    case RECEIVE_ALL_EVENTS:
      return [];
    case RECEIVE_EVENT:
      return [];
    default:
      return state;
  }
}

export default eventErrorsReducer;