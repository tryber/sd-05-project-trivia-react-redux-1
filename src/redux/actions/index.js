import apiToken from '../../services/apiToken';

export const RECEBER_TOKEN = 'RECEBER_TOKEN';
export const RECEBER_TOKEN_SUCCESS = 'RECEBER_TOKEN_SUCCESS';

export const actionReceberToken = () => ({
  type: RECEBER_TOKEN,
});

export const actionReceberTokenSuccess = (payload) => ({
  type: RECEBER_TOKEN_SUCCESS,
  payload,
});

export const resolverToken = () => (dispatch) => {
  dispatch(actionReceberToken());
  return apiToken()
  .then((token) => dispatch(actionReceberTokenSuccess(token)))
};
