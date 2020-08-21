import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import loginReducer from './loginReducer';
import questionsReducer from './questionsReducer';

const reducers = combineReducers({
  tokenReducer,
  loginReducer,
  questionsReducer,
});

export default reducers;
