import {
  SUBMIT_CARD_REQUEST,
  SUBMIT_CARD_SUCCESS,
  SUBMIT_CARD_ERROR
} from '../actions/delete-card';

const initialState = {
  loading: false,
  error: null
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case DELETE_CARD_REQUEST:
      return Object.assign({}, state, {loading: true, error: null});
    case DELETE_CARD_SUCCESS:
      return Object.assign({}, state, {loading: false, error: null});
    case DELETE_CARD_ERROR:
      return Object.assign({}, {loading: false, error: action.error}); 
    default:
      return state;     
  }
}