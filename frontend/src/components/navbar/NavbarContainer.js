import { connect } from 'react-redux';
import { signup, login, logout } from '../../actions/sessionActions';
import Navbar from './Navbar';
import { findEvents } from '../../actions/eventsActions';

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return {
    user: state.session.user,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signup(user)),
    login: (user) => dispatch(signup(login)),
    logout: () => dispatch(logout()),
    findEvents: (searchOptions) => dispatch(findEvents(searchOptions))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
