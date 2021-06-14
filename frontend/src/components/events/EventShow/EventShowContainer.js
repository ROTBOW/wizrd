import { connect } from 'react-redux';
import EventShow from './EventShow';
import { fetchAllEvents, fetchEvent } from '../../../actions/eventsActions'


const mapStateToProps = (state, ownProps) => {
    return {
        event: state.entities.events[ownProps.match.params.eventId],
        events: state.entities.events
    }
}


const mapDispatchToProps = dispatch => {
    return {
        fetchEvent: eventId => dispatch(fetchEvent(eventId)),
        fetchAllEvents: () => dispatch(fetchAllEvents())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventShow);
