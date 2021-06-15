import { connect } from 'react-redux';
import Chat from './Chat';

const mapStateToProps = (state) => ({
  user: state.session.user,
  chatId: 1
})

export default connect(mapStateToProps)(Chat);