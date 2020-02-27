import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from '../ducks';
import client from './apollo';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error(err);
  }
};

export const history = createHistory();

const enhancers = [];

const middleware = [thunk, client.middleware(), routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, composedEnhancers);

store.subscribe(() => {
  saveState({
    common: store.getState().common
  });
});

export default store;
