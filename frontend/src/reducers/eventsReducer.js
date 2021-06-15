import { RECEIVE_ALL_EVENTS, RECEIVE_EVENT, REMOVE_EVENT } from '../actions/eventsActions';




const EventsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);

    switch(action.type) {

        case RECEIVE_ALL_EVENTS: return receiveAllThemEvents(action.events.data);

        case RECEIVE_EVENT: return receiveAEvent(action.event, nextState);

        case REMOVE_EVENT: return removeAEvent(action.eventId, nextState);

        default: return state;
    }
}

const receiveAllThemEvents = function(events) {
    let answer = {};
    for (let id in events) {
        answer[events[id]._id] = events[id]
    }
    return answer
}

const receiveAEvent = function(event, nextState) {
    nextState[event.data._id] = event.data;
    return nextState;
}

const removeAEvent = function(eventId, nextState) {
    delete nextState[eventId];
    return nextState;
}

export default EventsReducer;