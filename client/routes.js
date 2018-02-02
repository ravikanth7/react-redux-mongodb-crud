/* eslint-disable global-require */
import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback, name) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./containers/HomePage/HomePage');
  require('./containers/User/components/Login/Login');
  require('./containers/User/components/SignUp/SignUp');
  require('./containers/Products/components/List/List');
  require('./containers/Products/components/New/New');
  require('./containers/Products/components/Edit/Edit');
  require('./components/404');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/HomePage/HomePage').default);
        },'homepage');
      }}
    />
    <Route
      path="/login"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/User/components/Login/Login').default);
        },'login');
      }}      
    />
    <Route
      path="/register"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/User/components/SignUp/SignUp').default);
        },'signup');
      }}      
    />
    <Route
      path="/products"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/Products/components/List/List').default);
        },'products');
      }}      
    />
    <Route
      path="/product/new"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/Products/components/New/New').default);
        },'products');
      }}      
    />
    <Route
      path="/product/edit/:id"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/Products/components/Edit/Edit').default);
        },'products');
      }}      
    />                 
    <Route
      path="*"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/404').default);
        },'notfound');
      }}      
    />              
  </Route>
);