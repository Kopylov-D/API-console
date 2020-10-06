import {combineReducers} from 'redux';
import {authreducer} from './auth';

export default combineReducers({
  auth: authreducer,
});
