import resolveQuestions from '../../services/apiQuestions';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_SUCCESS = 'REQUEST_QUESTIONS_SUCCESS';

export const actionQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const actionQuestionsSuccess = (payload) => ({
  type: REQUEST_QUESTIONS_SUCCESS,
  payload,
});

export const dispatchQuestions = () => (dispatch) => {
  dispatch(actionQuestions());
  return resolveQuestions()
  .then((questions) => dispatch(actionQuestionsSuccess(questions)));
};
