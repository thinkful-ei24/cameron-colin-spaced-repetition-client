import {
  SUBMIT_CARD_REQUEST,
  SUBMIT_CARD_SUCCESS,
  SUBMIT_CARD_ERROR,
  CLEAR_SUBMITTED
} from '../actions/add-card';

const initialState = {
  loading: false,
  submitted: false,
  error: null
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case SUBMIT_CARD_REQUEST:
      return Object.assign({}, state, {loading: true, error: null});
    case SUBMIT_CARD_SUCCESS:
      return Object.assign({}, state, {loading: false, submitted: true});
    case SUBMIT_CARD_ERROR:
      return Object.assign({}, {loading: false, error: action.error});
    case CLEAR_SUBMITTED:
      return Object.assign({}, {submitted: false});  
    default:
      return state;     
  }
}