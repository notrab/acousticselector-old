import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import client from '../store/apollo';
import filter from './filter';
import options from './options';
import common from './common';

const reducers = combineReducers({
  apollo: client.reducer(),
  router: routerReducer,
  filter,
  options,
  common
});

export default reducers;
