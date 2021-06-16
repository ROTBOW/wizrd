import { connect } from 'react-redux';
import { createEvent } from '../../../actions/eventsActions'
import EventForm from './EventForm';

const mapStateToProps = state => {
    return {
        currentUser: state.session.user,
        errors: state.errors.session,
        event: state.entities.events
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createEvent: event => dispatch(createEvent(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);