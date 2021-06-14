import { connect } from 'react-redux';
import { signup } from '../../actions/sessionActions';
import SignupForm from './SignupForm';

const mapStateToProps = (state) => {
  return {
    isSignedUp: state.session.isSignedUp,
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: user => dispatch(signup(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);