import * as APIUtil from '../util/eventUtil';

export const RECEIVE_ALL_EVENTS = 'RECEIVE_ALL_EVENTS';
export const RECEIVE_EVENT = 'RECEIVE_EVENT';
export const REMOVE_EVENT = 'REMOVE_EVENT';


const receiveAllEvents = events => {
    return {
        type: RECEIVE_ALL_EVENTS,
        events
    }
};

const receiveEvent = event => {
    return {
        type: RECEIVE_EVENT,
        event
    }
};

const removeEvent = eventId => {
    return {
        type: REMOVE_EVENT,

    }
};

export const fetchAllEvents = () => dispatch => {
    return APIUtil.fetchEvents()
        .then(events => dispatch(receiveAllEvents(events)))
};

export const fetchLiveEvents = () => dispatch => {
    return APIUtil.fetchLiveEvents()
        .then(events => dispatch(receiveAllEvents(events)))
}

export const fetchEvent = eventId => dispatch => {
    return APIUtil.fetchEvent(eventId)
        .then(event => dispatch(receiveEvent(event)))
};


export const createEvent = event => dispatch => {
    return APIUtil.createEvent(event)
        .then(event => dispatch(receiveEvent(event)))
};

export const updateEvent = event => dispatch => {
    return APIUtil.updateEvent(event)
        .then(event => dispatch(receiveEvent(event)))
};

export const destoryEvent = eventId => dispatch => {
    return APIUtil.deleteEvent(eventId)
        .then(() => dispatch(removeEvent(eventId)))
}