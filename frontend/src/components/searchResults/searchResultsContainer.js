import { connect } from 'react-redux';
import searchResults from './searchResults';
import { findEvents } from '../../actions/eventsActions';

const mapStateToProps = (state) => ({
  events: state.entities.events
})

const mapDispatchToProps = (dispatch) => ({
  findEvents: (searchOptions) => dispatch(findEvents(searchOptions))
})

export default connect(mapStateToProps, mapDispatchToProps)(searchResults);