/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectErr = (state) => state.get('ErrReducer');

export const getError = () => createSelector(
  selectErr,
  (errState) => errState.get('error')
);

export const getErrorMsg = () => createSelector(
  selectErr,
  (errState) => errState.get('errormsg')
);

const selectUser = (state) => state.get('user');

export const getUserData = () => createSelector(
  selectUser,
  (userState) => userState.getIn(['account', 'data'])
);

const selectProducts = (state) => state.get('products');

export const getProductsData = () => createSelector(
  selectProducts,
  (productState) => productState.getIn(['products', 'data'])
);

export const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};
