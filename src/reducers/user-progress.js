import {
  FETCH_QUESTIONS_REQUEST,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_ERROR
} from '../actions/user-progress.js';

import {
  DELETE_CARD_SUCCESS
} from '../actions/delete-card';

const initialState = {
  questions: [],
  error: null,
  loading: false
}

export default function progressReducer(state = initialState, action) {

  if (action.type === FETCH_QUESTIONS_REQUEST) {
    return Object.assign({}, state, {
      error: null,
      loading: true
    })
  } else if (action.type === FETCH_QUESTIONS_SUCCESS) {
    console.log('called');
    return Object.assign({}, state, {
      questions: action.questions,
      loading: false
    })
  } else if (action.type === FETCH_QUESTIONS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    })
  } else if (action.type === DELETE_CARD_SUCCESS){
    console.log('called here')
    return Object.assign({}, state, {
      loading: false,
      questions: state.questions.filter(question => question.id !== action.id)
    })
  }
  return state;
}


