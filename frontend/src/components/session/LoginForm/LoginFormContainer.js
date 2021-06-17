import { connect } from 'react-redux';
import { login } from '../../../actions/sessionActions';
import LoginForm from './LoginForm';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user))
    // add demo login dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);