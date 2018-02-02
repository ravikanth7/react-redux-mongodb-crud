/**
 * Product Actions
 *
 */

import callApi from '../../lib/apiCaller';

// Export Constants
export const FETCHPRODS_REQUEST = 'FETCHPRODS_REQUEST';
export const FETCHPRODS_SUCCESS = 'FETCHPRODS_SUCCESS';
export const FETCHPRODS_FAILURE = 'FETCHPRODS_FAILURE';

export const FETCHPROD_REQUEST = 'FETCHPROD_REQUEST';
export const FETCHPROD_SUCCESS = 'FETCHPROD_SUCCESS';
export const FETCHPROD_FAILURE = 'FETCHPROD_FAILURE';

export const ADDPROD_REQUEST = 'ADDPROD_REQUEST';
export const ADDPROD_SUCCESS = 'ADDPROD_SUCCESS';
export const ADDPROD_FAILURE = 'ADDPROD_FAILURE';

export const EDITPROD_REQUEST = 'EDITPROD_REQUEST';
export const EDITPROD_SUCCESS = 'EDITPROD_SUCCESS';
export const EDITPROD_FAILURE = 'EDITPROD_FAILURE';

/**
  * All Products
  */
export function fetchprods() {
  return (dispatch) => {
      dispatch({ type: FETCHPRODS_REQUEST });
    return callApi('products','get',false).then(res => {
      dispatch({ type: FETCHPRODS_SUCCESS, data: res.products });
    },err => {
      dispatch({ type: FETCHPRODS_FAILURE, error: err });
      throw new Error(err.message);
    });
  };
}

/**
  * Add Product
  */
export function addprd(payload) {
  return (dispatch) => {
      dispatch({ type: ADDPROD_REQUEST });
    return callApi('products','post',false,payload).then(res => {
      dispatch({ type: ADDPROD_SUCCESS, data: res.product });
    },err => {
      dispatch({ type: ADDPROD_FAILURE, error: err });
      throw new Error(err.message);
    });
  };
}

/**
  * Edit Product
  */
export function editprd(payload,id) {
  const endpoint = "product/"+id
  return (dispatch) => {
      dispatch({ type: EDITPROD_REQUEST });
    return callApi(endpoint,'post',false,payload).then(res => {
      dispatch({ type: EDITPROD_SUCCESS, data: res.product });
    },err => {
      dispatch({ type: EDITPROD_FAILURE, error: err });
      throw new Error(err.message);
    });
  };
}

/**
  * Get Product
  */
export function fetchprd(id) {
  const endpoint = "product/"+id
  return (dispatch) => {
      dispatch({ type: FETCHPROD_REQUEST });
    return callApi(endpoint,'get',false).then(res => {
      dispatch({ type: FETCHPROD_SUCCESS, data: res.product });
      return res.product
    },err => {
      dispatch({ type: FETCHPROD_FAILURE, error: err });
      throw new Error(err.message);
    });
  };
}