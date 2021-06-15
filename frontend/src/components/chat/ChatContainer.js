import { connect } from "react-redux";
import Chat from './Chat';
import { receiveMessage } from '../../actions/chatActions';

const mapStateToProps = (state) => ({
  messages: state.messages
})

// const mapDispatchToProps = (dispatch) => ({
//   receiveMessage: (message) => dispatch(receiveMessage(message))
// })

export default connect(mapStateToProps)(Chat);