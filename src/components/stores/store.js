import { createStore, combineReducers } from 'redux';
import coresiteReducer from './coresiteReducer';

export const store = createStore(combineReducers({
  coresite: coresiteReducer
}));
