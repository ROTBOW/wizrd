import { combineReducers } from "redux";
import session from './sessionReducer';
import errors from './errorsReducer';
import entities from './entitiesReducer';
import ui from './uiReducer';

const RootReducer = combineReducers({
    entities,
    session,
    errors,
    ui
});

export default RootReducer;