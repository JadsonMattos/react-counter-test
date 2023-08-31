import { legacy_createStore as createStore, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import counterReducer from './reducer/counterReducer';

const store = createStore(
  combineReducers({ counterReducer }),
  composeWithDevTools()
);

export default store;
