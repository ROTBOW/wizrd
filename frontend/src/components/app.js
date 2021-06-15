import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/routeUtil';
import { Switch } from 'react-router-dom';
import LoginFormContainer from './session/LoginFormContainer';
import SignupFormContainer from './session/SignupFormContainer';
import { Link } from 'react-router-dom';
import Video from './video/Video/Video';
import Chat from './chat/Chat';
import NavbarContainer from './navbar/NavbarContainer'

class temp extends React.Component {
  render() {
    return (
      <div style={{'maxWidth': '1024px', 'margin': '0 auto', 'padding': '32px 32px'}}>
        <h2>Welcome to this site, I guess...</h2>
        <p><Link to="/login">Login</Link></p>
        <p><Link to="/signup">Sign up</Link></p>
      </div>
    )
  }
}


const App = () => (
  <div>
    <NavbarContainer />
    <Switch>
      <AuthRoute exact path="/" component={temp} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/chat" component={Chat} />
      <AuthRoute exact path="/" component={temp} />
    </Switch>
  </div>
);

export default App;