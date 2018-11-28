import {
  FETCH_QUESTIONS_REQUEST,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_ERROR
} from '../actions/user-progress.js';

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
      console.log(action.questions)
    return Object.assign({}, state, {
      questions: action.questions,
      loading: false
    })
  } else if (action.type === FETCH_QUESTIONS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    })
  }
  return state;
}


