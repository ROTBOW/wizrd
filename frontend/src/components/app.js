import React from 'react';
import { AuthRoute, ProtectedRoute, HomeRoute } from '../util/routeUtil';
import { Switch } from 'react-router-dom';
import LoginFormContainer from './session/LoginForm/LoginFormContainer';
import SignupFormContainer from './session/SignupForm/SignupFormContainer';
import { Link } from 'react-router-dom';
import EventFormContainer from './events/EventForm/EventFormContainer';
import Video from './video/Video/Video';
import NavbarContainer from './navbar/NavbarContainer'
import EventShowContainer from './events/EventShow/EventShowContainer'
import Footer from './footer/Footer';

const App = () => (
  <>
    <NavbarContainer />
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/event/create" component={EventFormContainer}/>
      <ProtectedRoute exact path="/event/:eventId" component={EventShowContainer}/>
      <HomeRoute path="/" /> 
    </Switch>
    <Footer />
  </>
);

export default App;