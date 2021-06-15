import { RECEIVE_ALL_EVENTS, RECEIVE_EVENT, REMOVE_EVENT } from '../actions/eventsActions';




const EventsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);

    switch(action.type) {

        case RECEIVE_ALL_EVENTS: return action.events.data;

        case RECEIVE_EVENT: return receiveAEvent(action.event, nextState);

        case REMOVE_EVENT: return removeAEvent(action.eventId, nextState);

        default: return state;
    }
}

const receiveAEvent = function(event, nextState) {
    debugger
    nextState[event.id] = event;
    return nextState;
}

const removeAEvent = function(eventId, nextState) {
    delete nextState[eventId];
    return nextState;
}

export default EventsReducer;