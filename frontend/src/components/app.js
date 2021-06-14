import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/routeUtil';
import { Switch } from 'react-router-dom';
import LoginFormContainer from './session/LoginFormContainer';
import SignupFormContainer from './session/SignupFormContainer';
import { Link } from 'react-router-dom';

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
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <AuthRoute exact path="/" component={temp} />
    </Switch>
  </div>
);

export default App;