import {RECEBER_TOKEN, RECEBER_TOKEN_SUCCESS} from '../actions';

const INITIAL_STATE = {
  token: {},
  isFetching: false,
}

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case RECEBER_TOKEN:
      return {
        ...state,
        isFetching: true
      };
      case RECEBER_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isFetching: false
      };
    default:
      return state;
  }
};

export default reducer;