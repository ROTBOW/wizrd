import { connect } from 'react-redux';
import EventShow from './EventShow';
import { fetchAllEvents, fetchEvent, updateEvent } from '../../../actions/eventsActions'


const mapStateToProps = (state, ownProps) => {
    return {
        event: state.entities.events[ownProps.match.params.eventId],
        eventId: ownProps.match.params.eventId,
        user: state.session.user
    }
}


const mapDispatchToProps = dispatch => {
    return {
        fetchEvent: eventId => dispatch(fetchEvent(eventId)),
        fetchAllEvents: () => dispatch(fetchAllEvents()),
        updateEvent: event => dispatch(updateEvent(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventShow);
