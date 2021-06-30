import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

let myMiddlewares;
if (process.env.NODE_ENV === "production") {
  myMiddlewares = [thunk];
} else {
  myMiddlewares = [thunk, logger];
}

const configureStore = (preloadedState = {}) => {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...myMiddlewares)
  )
};

export default configureStore;