import { GET_SCORE } from '../actions/actionScore';

const INITIAL_STATE = {
  score: 0,
};

const scoreReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    default:
      return state;
  }
};

export default scoreReducer;
