import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const CORRECT_GUESS = 'CORRECT_GUESS';
export const correctGuess = () => ({
  type: CORRECT_GUESS
});

export const INCORRECT_GUESS = 'INCORRECT_GUESS';
export const incorrectGuess = () => ({
  type: INCORRECT_GUESS
})