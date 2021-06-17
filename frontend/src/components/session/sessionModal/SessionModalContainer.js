import { connect } from 'react-redux';
import SessionModal from './SessionModal';
import { login } from '../../../actions/sessionActions';

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

export default connect(mapStateToProps, mapDispatchToProps)(SessionModal);