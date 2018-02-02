/**
 * Root Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { applyRouterMiddleware,Router } from 'react-router';
import { useScroll } from 'react-router-scroll';
// Import Routes
import routes from './routes';
// import Perf from 'react-addons-perf';

// Base stylesheet
require('./theme/main.css');

export default class App extends React.Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
          <Router history={history} routes={routes} render={applyRouterMiddleware(useScroll(() => { return [0, 0]; }))} />
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};
