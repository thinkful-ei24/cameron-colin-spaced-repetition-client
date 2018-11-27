import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
    data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const fetchProtectedData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/questions`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(fetchProtectedDataSuccess(data)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};

export const SEND_ANSWER_REQUEST = 'SEND_ANSWER_REQUEST'
export const sendAnswerRequest = () => ({
  type: SEND_ANSWER_REQUEST
})

export const SEND_ANSWER_SUCCESS = 'SEND_ANSWER_SUCCESS'
export const sendAnswerSuccess = (data) => ({
  type: SEND_ANSWER_SUCCESS,
  data
})

export const SEND_ANSWER_ERROR = 'SEND_ANSWER_ERROR'
export const sendAnswerError = (error) => ({
  type: SEND_ANSWER_ERROR,
  error
})

export const updateProtectedData = (_question, _answer) => (dispatch, getState) => {
  const data = {question: _question.toUpperCase(), answer: _answer.toUpperCase()}
  const authToken = getState().authToken;
  dispatch(sendAnswerRequest())
  return fetch(`API_BASE_URL}/questions`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(data)
  })
    .then(result => result.json())
    .then(data => {
      dispatch(sendAnswerSuccess(data))
    })
    .catch(err => {
      dispatch(sendAnswerError(err))
    })
}
