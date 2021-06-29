import { connect } from 'react-redux';
import EventShow from './EventShow';
import { fetchAllEvents, fetchEvent, updateEvent } from '../../../actions/eventsActions';
import { updateModal } from '../../../actions/uiActions';


const mapStateToProps = (state, ownProps) => {
    return {
        event: state.entities.events[ownProps.match.params.eventId],
        eventId: ownProps.match.params.eventId,
        user: state.session.user,
        modal: state.ui.modal
    }
}


const mapDispatchToProps = dispatch => {
    return {
        fetchEvent: eventId => dispatch(fetchEvent(eventId)),
        fetchAllEvents: () => dispatch(fetchAllEvents()),
        updateEvent: event => dispatch(updateEvent(event)),
        updateModal: modalName => dispatch(updateModal(modalName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventShow);
