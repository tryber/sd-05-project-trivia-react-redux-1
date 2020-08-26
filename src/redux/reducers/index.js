import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import loginReducer from './loginReducer';
import questionsReducer from './questionsReducer';
import scoreReducer from './scoreReducer';

const reducers = combineReducers({
  tokenReducer,
  loginReducer,
  questionsReducer,
  scoreReducer,
});

export default reducers;
