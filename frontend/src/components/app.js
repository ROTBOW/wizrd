import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/routeUtil';
import { Switch } from 'react-router-dom';
import LoginFormContainer from './session/LoginForm/LoginFormContainer';
import SignupFormContainer from './session/SignupForm/SignupFormContainer';
import { Link } from 'react-router-dom';
import EventFormContainer from './events/EventForm/EventFormContainer';
import Video from './video/Video/Video';
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
  <>
    <NavbarContainer />
    <Switch>
      <AuthRoute exact path="/" component={temp} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />

      <ProtectedRoute exact path="/event/create" component={EventFormContainer}/>
      <ProtectedRoute exact path="/event/:eventId" component={EventShowContainer}/>
      <AuthRoute exact path="/" component={temp} />
    </Switch>
  </>
);

export default App;