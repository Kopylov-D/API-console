import {combineReducers} from 'redux';
import {authreducer} from './auth';
import { mainReducer } from './main';

export default combineReducers({
  auth: authreducer,
  main: mainReducer,
});
