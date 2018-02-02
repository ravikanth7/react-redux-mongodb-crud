/**
 * User Actions
 *
 */

import callApi from '../../lib/apiCaller';

// Export Constants
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const VALIDATEUSER_REQUEST = 'VALIDATEUSER_REQUEST';
export const VALIDATEUSER_SUCCESS = 'VALIDATEUSER_SUCCESS';
export const VALIDATEUSER_FAILURE = 'VALIDATEUSER_FAILURE';

const storeToken = async (token) => {
  await localStorage.setItem('_u_t', token);
}

const deleteToken = async () => {
  await localStorage.setItem('_u_t', '');
}

/**
  * Login
  */
export function login(payload) {
  return (dispatch) => {
      dispatch({ type: LOGIN_REQUEST });
    return callApi('login','post',false,payload).then(res => {
      dispatch({ type: LOGIN_SUCCESS, data: res.user });
      storeToken(res.token);
      return res.status;
    },err => {
      if(err.status != 403) {
        dispatch({ type: LOGIN_FAILURE, error: err });
        deleteToken();
      }
        throw new Error(err.message);
    });
  };
}

/**
  * Logout
  */
export function logout() {
  return (dispatch) => deleteToken()
    .then(() => {
      dispatch({ type: LOGOUT_SUCCESS, data: {} });
    });
}

/**
  * Signup
  */
export function register(payload) {
  return (dispatch) => {
      dispatch({ type: REGISTER_REQUEST });
    return callApi('users','post',false,payload).then(res => {
      dispatch({ type: REGISTER_SUCCESS, data: res.user });
      storeToken(res.token);
      return res.status;
    },err => {
      if(err.status != 403) {
        dispatch({ type: REGISTER_FAILURE, error: err });
        deleteToken();
      }
        throw new Error(err.message);
    });
  };
}

/**
  * Validate User
  */
export function validate(payload) {
  return (dispatch) => {
      dispatch({ type: VALIDATEUSER_REQUEST });
    return callApi('authenticate','post',false,payload).then(res => {
      dispatch({ type: VALIDATEUSER_SUCCESS, data: res.user });
      storeToken(res.token);
      return res.status;
    },err => {
      dispatch({ type: VALIDATEUSER_FAILURE });        
      deleteToken();
    });
  };
}