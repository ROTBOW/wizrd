import { combineReducers } from "redux";
import session from './sessionReducer';
import errors from './errorsReducer';
import messages from './messageReducer';

const RootReducer = combineReducers({
    session,
    errors,
    messages
});

export default RootReducer;