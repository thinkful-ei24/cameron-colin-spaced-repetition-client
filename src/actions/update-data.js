import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { fetchProtectedDataError } from './protected-data';

export const CORRECT_GUESS = 'CORRECT_GUESS';
export const correctGuess = () => ({
  type: CORRECT_GUESS
});

export const INCORRECT_GUESS = 'INCORRECT_GUESS';
export const incorrectGuess = () => ({
  type: INCORRECT_GUESS
});

export const updateData = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/questions`, {
    method: 'POST',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    },
    body: {
      data: getState().protectedData.data
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => {
      dispatch(fetchProtectedDataError(err));
    });
}
