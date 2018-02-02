/**
 * Product Reducer
 *
 */
import { fromJS,toJS } from 'immutable';

// Import Actions
import { FETCHPRODS_REQUEST,FETCHPRODS_SUCCESS,FETCHPRODS_FAILURE } from './ProductsActions';


// Set initial state
const initialState = fromJS({
  products: {isFetching: false, data: []}, 
});

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHPRODS_REQUEST:
      return state.setIn(['products','isFetching'], true);
    
    case FETCHPRODS_SUCCESS:
      return state.setIn(['products','isFetching'], false).setIn(['products','data'], fromJS(action.data));;
    
    case FETCHPRODS_FAILURE:
      return state.setIn(['products','isFetching'], false);

    default:
      return state;    
  }
}