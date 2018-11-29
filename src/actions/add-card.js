import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const SUBMIT_CARD_REQUEST = 'SUBMIT_CARD_REQUEST';
export const submitCardRequest = () => ({
  type: SUBMIT_CARD_REQUEST
});

export const SUBMIT_CARD_SUCCESS = 'SUBMIT_CARD_SUCCESS';
export const submitCardSuccess= () => ({
  type: SUBMIT_CARD_SUCCESS
});

export const SUBMIT_CARD_ERROR = 'SUBMIT_CARD_ERROR';
export const submitCardError = (error) => ({
  type: SUBMIT_CARD_ERROR,
  error
});

export const CLEAR_SUBMITTED = 'CLEAR_SUBMITTED';
export const clearSubmitted= () => ({
  type: CLEAR_SUBMITTED
});


export const submitCard = (question, answer) => (dispatch, getState) => {
  const data = {question: question.toUpperCase(), answer: answer.toUpperCase()}
  const authToken = getState().auth.authToken;
  dispatch(submitCardRequest())
  return fetch(`${API_BASE_URL}/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(data)
  })
    .then(result => result.json())
    .then(result => {
      dispatch(submitCardSuccess(result))
    })
    .catch(err => {
      console.log('hitting an error')
      dispatch(submitCardError(err))
    })
}