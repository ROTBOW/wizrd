import React from 'react';
import { AuthRoute, ProtectedRoute, HomeRoute } from '../util/routeUtil';
import { Switch } from 'react-router-dom';
import LoginFormContainer from './session/LoginFormContainer';
import SignupFormContainer from './session/SignupFormContainer';
import { Link } from 'react-router-dom';
import Video from './video/Video/Video';
import NavbarContainer from './navbar/NavbarContainer'

const App = () => (
  <>
    <NavbarContainer />
    <Switch>
      <HomeRoute exact path='/' />
      <AuthRoute exact path='/login' component={LoginFormContainer} />
      <AuthRoute exact path='/signup' component={SignupFormContainer} />
    </Switch>
  </>
);

export default App;