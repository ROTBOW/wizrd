import React from 'react';
import { AuthRoute, ProtectedRoute, HomeRoute } from '../util/routeUtil';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './session/LoginForm/LoginFormContainer';
import SignupFormContainer from './session/SignupForm/SignupFormContainer';
import NavbarContainer from './navbar/NavbarContainer';
import EventShowContainer from './events/EventShow/EventShowContainer';
import SearchResultsContainer from './searchResults/searchResultsContainer';
import Footer from './footer/Footer';
import About from './about/About';

const App = () => (
  <>
    <NavbarContainer />
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/events/:eventId" component={EventShowContainer}/>
      <Route exact path="/search" component={SearchResultsContainer}/>
      <Route exact path="/about" component={About} />
      <HomeRoute path="/" /> 
    </Switch>
    {/* <Footer /> */}
  </>
);

export default App;