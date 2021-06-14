import { combineReducers } from "redux";
import session from './sessionReducer';
import errors from './errorsReducer';
import entities from './entitiesReducer'

const RootReducer = combineReducers({
    entities,
    session,
    errors
});

export default RootReducer;