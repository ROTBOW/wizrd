import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/routeUtil';
import { Switch } from 'react-router-dom';
import LoginFormContainer from './session/LoginForm/LoginFormContainer';
import SignupFormContainer from './session/SignupForm/SignupFormContainer';
import { Link } from 'react-router-dom';
import EventForm from './events/EventForm';
import Video from './video/Video/Video';

class temp extends React.Component {
  render() {
    return (
      <div>
        Welcome to this site, I guess...
        <Link to="/login">login</Link>
        <Link to="/Signup">Signup</Link>
      </div>
    )
  }
}


const App = () => (
  <div>
    <Video />
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />

      <ProtectedRoute exact path="/event/create" component={EventForm}/>
      <AuthRoute exact path="/" component={temp} />
    </Switch>
  </div>
);

export default App;