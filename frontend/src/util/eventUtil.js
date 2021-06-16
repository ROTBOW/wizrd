import axios from "axios";

/*
GET /api/events  -> grabs all events
GET /api/events/:eventId -> specific event
POST /api/events ->  create event
DELETE /api/events/:eventId -> delete event
PATCH /api/events/:eventId -> update event
*/

export const fetchEvents = () => {
    return axios.get('/api/events')
}

export const fetchLiveEvents = () => {
    return axios({
        method: 'GET',
        url: '/api/events',
        data: {time: 'live'}
    })
}

export const fetchEvent = eventId => { //this might be singular not plural
    return axios.get(`api/events/${eventId}`)
}

export const createEvent = event => {
    return axios.post('api/events', event)
}

export const updateEvent = event => {
    return axios.patch(`api/events/${event.id}`, event)
}

export const deleteEvent = eventId => {
    return axios.delete(`api/events/${eventId}`)
}