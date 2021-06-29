import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/sessionUtil';
import { logout } from './actions/sessionActions';
import { findEvents } from './actions/eventsActions';


document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);

    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser },
    };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/';
    }
  } else {
    store = configureStore({});
  }
  
  const root = document.getElementById('root');
  window.store = store;
  window.findEvents = findEvents;

  ReactDOM.render(<Root store={store} />, root);
});
