import { connect } from 'react-redux';
import { createEvent } from '../../../actions/eventsActions'
import EventForm from './EventFormClass';

const mapStateToProps = (state) => ({
  currentUser: state.session.user,
  errors: state.errors.session,
  event: state.entities.events
});

const mapDispatchToProps = (dispatch) => ({
  createEvent: (event) => dispatch(createEvent(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
