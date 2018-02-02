/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS,toJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import DevTools from './containers/App/components/DevTools';
import rootReducer from './reducers';

export function configureStore(initialState = {}, history) {
  const middlewares = [
    thunk,
    routerMiddleware(history),
  ];
  
  // Middleware and store enhancers
  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering on client and during development.
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
  }

  const store = createStore(rootReducer, fromJS(initialState), compose(...enhancers));

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
