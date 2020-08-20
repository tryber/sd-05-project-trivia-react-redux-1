import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import loginReducer from './loginReducer';

const reducers = combineReducers({
  tokenReducer,
  loginReducer,
});

export default reducers;
