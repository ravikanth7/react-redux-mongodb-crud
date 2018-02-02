/**
 * Root Reducer
 */
import { combineReducers } from 'redux-immutable';
import { fromJS,toJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
// Import Reducers
import user from './containers/User/UserReducer';
import products from './containers/Products/ProductsReducer';
import { reducer as reduxFormReducer } from 'redux-form/immutable';

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

// Initial State
const initialState = fromJS({
  error: false,
  errormsg: '',
});

const ErrReducer = (state = initialState, action) => {
  const { type, error } = action;

  if (type == LOCATION_CHANGE) {
    return state.set('error', false).set('errormsg', '');
  }

  if (error && type.indexOf('_FAILURE') > -1) {
    return state.set('error', true).set('errormsg', error.message);
      // return Object.assign({}, state, { error: true, errormsg: error.message });
  }

  return state;
}

// Combine all reducers into one root reducer
export default combineReducers({
  route: routeReducer,
  form: reduxFormReducer, 
  user,
  products,
  ErrReducer
});
