import { connect } from 'react-redux';
import SearchResults from './searchResults';
import { findEvents } from '../../actions/eventsActions';
import { updateModal } from '../../actions/uiActions';

const mapStateToProps = (state, ownProps) => ({
  events: state.entities.events,
  errors: state.errors.events,
  isLoggedIn: state.session.isAuthenticated,
  modal: state.ui.modal
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  findEvents: (searchOptions) => dispatch(findEvents(searchOptions)),
  updateModal: (modalName) => dispatch(updateModal(modalName))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);