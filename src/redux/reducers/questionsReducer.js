import { 
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_SUCCESS,
} from '../actions/actionQuestions';

const INITIAL_STATE = {
  questions: [],
  isFetching: false,
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_QUESTIONS:
      return {
        ...state,
        isFetching: true,
      };
    case REQUEST_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload,
      };
    default:
      return state;
  }
};

export default questionsReducer;
