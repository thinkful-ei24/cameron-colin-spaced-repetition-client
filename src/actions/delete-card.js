import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const DELETE_CARD_REQUEST = 'DELETE_CARD_REQUEST';
export const deleteCardRequest = () => ({
  type: DELETE_CARD_REQUEST
});

export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';
export const deleteCardSuccess= () => ({
  type: DELETE_CARD_SUCCESS
});

export const DELETE_CARD_ERROR = 'DELETE_CARD_ERROR';
export const deleteCardError = (error) => ({
  type: DELETE_CARD_ERROR,
  error
});


export const deleteCard = (_id) => (dispatch, getState) => {
  const data = {_id};
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