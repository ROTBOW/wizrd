import { connect } from 'react-redux';
import SessionModal from './SessionModal';
import { login, signup } from '../../../actions/sessionActions';
import { updateModal } from '../../../actions/uiActions';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    signup: (user) => dispatch(signup(user)),
    updateModal: (modalName) => dispatch(updateModal(modalName))
    // add demo login dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionModal);