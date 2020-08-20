import { NAME, EMAIL, IS_LOGGED } from '../actions/actionLogin';

const INITIAL_STATE = {
  name: '',
  email: '',
  isLogged: false,
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAME:
      return {
        ...state,
        name: action.payload,
      };
    case EMAIL:
      return {
        ...state,
        email: action.payload,
        };
    case IS_LOGGED:
      return {
        ...state,
        isLogged: true,
      }
    default:
      return state;
  }
};

export default loginReducer;
