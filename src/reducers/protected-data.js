import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR
} from '../actions/protected-data';

import {
    CORRECT_GUESS,
    INCORRECT_GUESS
} from '../actions/update-data';

const initialState = {
    data:   {
        spanish: 'agua',
        english: 'water',
        score: 1,
        guesses: 0,
        correct: 0,
        next: '',
      },
    feedback: 'neutral',
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
        return Object.assign({}, state, {
            data: action.data,
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
    }
    return state;
}
