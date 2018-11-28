import {API_BASE_URL} from '../config.js';
import {normalizeResponseErrors} from './utils.js';

export const FETCH_QUESTIONS_REQUEST = 'FETCH_QUESTIONS_REQUEST';
export const fetchQuestionsRequest = () => ({
  type: FETCH_QUESTIONS_REQUEST
});

export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const fetchQuestionsSuccess = (questions) => ({
  type: FETCH_QUESTIONS_SUCCESS,
  questions
});

export const FETCH_QUESTIONS_ERROR = 'FETCH_QUESTIONS_ERROR';
export const fetchQuestionsError = (error) => ({
  type: FETCH_QUESTIONS_SUCCESS,
  error
});

export const getUserProgress = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchQuestionsRequest())
  return fetch(`${API_BASE_URL}/questions/progress`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(response => response.json())
    .then(questions => {
      dispatch(fetchQuestionsSuccess(questions))
    })
    .catch(err => {
      dispatch(fetchQuestionsError(err))
    })
}
