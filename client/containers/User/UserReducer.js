/**
 * User Reducer
 *
 */
import { fromJS,toJS } from 'immutable';

// Import Actions
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, VALIDATEUSER_REQUEST, VALIDATEUSER_SUCCESS, VALIDATEUSER_FAILURE } from './UserActions';


// Set initial state
const initialState = fromJS({
  account: {isFetching: false, data: {}}, 
});

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.setIn(['account','isFetching'], true);
    case REGISTER_REQUEST:
      return state.setIn(['account','isFetching'], true);
    case VALIDATEUSER_REQUEST:
      return state.setIn(['account','isFetching'], true);

    case LOGIN_SUCCESS:
      return state.setIn(['account','isFetching'], false).setIn(['account','data'], fromJS(action.data));
    case LOGOUT_SUCCESS:
      return state.setIn(['account','isFetching'], false).setIn(['account','data'], fromJS(action.data));
    case REGISTER_SUCCESS:
      return state.setIn(['account','isFetching'], false).setIn(['account','data'], fromJS(action.data));
    case VALIDATEUSER_SUCCESS:
      return state.setIn(['account','isFetching'], false).setIn(['account','data'], fromJS(action.data));

    case LOGIN_FAILURE:
      return state.setIn(['account','isFetching'], false);
    case REGISTER_FAILURE:
      return state.setIn(['account','isFetching'], false);

    case VALIDATEUSER_FAILURE:
      return state.setIn(['account','isFetching'], false).setIn(['account','data'], fromJS({}));  
    default:
      return state;
  }
}
