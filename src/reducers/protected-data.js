import {
  FETCH_PROTECTED_DATA_SUCCESS,
  FETCH_PROTECTED_DATA_ERROR,
  SEND_ANSWER_REQUEST,
  SEND_ANSWER_SUCCESS,
  SEND_ANSWER_ERROR
} from '../actions/protected-data';

import {
    CORRECT_GUESS,
    INCORRECT_GUESS
} from '../actions/update-data';

const initialState = {
  data:   {
    question: 'agua',
    answer: 'water',
    score: 1,
    guesses: 0,
    correct: 0,
    next: '',
  },
  feedback: 'neutral',
  error: null,
  loading: false
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
        return Object.assign({}, state, {
            data: action.data,
            feedback: 'neutral',
            error: null
        });
    } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if(action.type === CORRECT_GUESS){
        const guesses = state.data.guesses + 1;
        const correct = state.data.correct + 1;
        const score = Math.min(10, state.data.score+1);
        let newData = Object.assign({}, state.data, {
            guesses,
            correct,
            score
        });
        return Object.assign({}, state, {
            data: newData,
            feedback: 'correct'
        });
    } else if(action.type === INCORRECT_GUESS){
        const guesses = state.data.guesses + 1;
        const score = Math.max(1, state.data.score-1);
        let newData = Object.assign({}, state.data, {
            guesses,
            score
        });
        return Object.assign({}, state, {
            data: newData,
            feedback: 'incorrect'
        });
    } else if(action.type === SEND_ANSWER_REQUEST){
      return Object.assign({}, state, {
        loading: true,
        error: null
      })
    } else if(action.type === SEND_ANSWER_SUCCESS){
      return Object.assign({}, state, {
        lodaing: false,
        data: action.data
      })
    } else if(action.type === SEND_ANSWER_ERROR){
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    }
    return state;
}
