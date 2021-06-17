import { connect } from 'react-redux';
import { signup, login } from '../../../actions/sessionActions';
import SignupForm from './SignupForm.jsx';

const mapStateToProps = (state) => {
  return {
    isSignedUp: state.session.isSignedUp,
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signup(user)),
    login: (user) => dispatch(login(user)),
    // add demo login disp
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);