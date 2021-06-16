import { connect } from 'react-redux';
import StreamRoom from './StreamRoom';

const mapStateToProps = (state) => ({
  currentUserId: state.session.user.id,
})

export default connect(mapStateToProps)(StreamRoom)