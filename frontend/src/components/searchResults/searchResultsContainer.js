import { connect } from 'react-redux';
import SearchResults from './searchResults';
import { findEvents } from '../../actions/eventsActions';

const mapStateToProps = (state, ownProps) => ({
  events: state.entities.events,
  errors: state.errors.events
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  findEvents: (searchOptions) => dispatch(findEvents(searchOptions))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);