import { combineReducers } from 'redux';

import sessionErrorsReducer from './sessionErrorsReducer';
import eventErrorsReducer from './eventErrorsReducer';

export default combineReducers({
  session: sessionErrorsReducer,
  events: eventErrorsReducer
});