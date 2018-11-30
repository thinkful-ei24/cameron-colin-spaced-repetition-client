import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const DELETE_CARD_REQUEST = 'DELETE_CARD_REQUEST';
export const DeleteCardRequest = () => ({
  type: DELETE_CARD_REQUEST
});

export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';
export const DeleteCardSuccess= () => ({
  type: DELETE_CARD_SUCCESS
});

export const DELETE_CARD_ERROR = 'DELETE_CARD_ERROR';
export const DeleteCardError = (error) => ({
  type: DELETE_CARD_ERROR,
  error
});


export const deleteCard = (question, guesses, correct) => (dispatch, getState) => {
  const data = {question: question.toUpperCase(), guesses, correct}
  const authToken = getState().auth.authToken;
  dispatch(deleteCardRequest())
  return fetch(`${API_BASE_URL}/questions`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(data)
  })
    .then(result => result.json())
    .then(result => {
      dispatch(deleteCardSuccess(result))
    })
    .catch(err => {
      dispatch(deleteCardError(err))
    })
}