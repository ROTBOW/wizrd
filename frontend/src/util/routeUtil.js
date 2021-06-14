import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import LoginFormContainer from '../components/session/LoginFormContainer';
// import logged in home page component 

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="" />
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
        <Redirect to="/login" />
      )
    }
  />
);

// const Home = ({ path, loggedIn, exact }) => (
//   <Route
//     path={path}
//     exact={exact}
//     render={(props) =>
//       loggedIn ? < {...props} /> : < {...props} />
//     }
//   />
// );

const mapStateToProps = state => (
  {loggedIn: state.session.isAuthenticated}
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));

// export const HomeRoute = withRouter(connect(mapStateToProps)(Home));
 