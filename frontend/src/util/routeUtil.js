import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import HomeFeed from '../components/home/HomeFeed';
import SplashHome from '../components/home/SplashHome';

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )} />
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const Home = ({ path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={(props) =>
      loggedIn ? <HomeFeed {...props} /> : <SplashHome {...props} />
    }
  />
);

const mapStateToProps = state => (
  {loggedIn: state.session.isAuthenticated}
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));

export const HomeRoute = withRouter(connect(mapStateToProps)(Home));
 