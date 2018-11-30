import {
  DELETE_CARD_REQUEST,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_ERROR
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