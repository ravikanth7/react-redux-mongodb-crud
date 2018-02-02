/**
 * Login Container
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link, browserHistory } from 'react-router';

// Actions
import { login } from '../../UserActions';

// The component we're mapping to
import LoginForm from './LoginForm';

import { createStructuredSelector } from 'reselect';
import { getUserData } from '../../../../selectors';

export class Login extends Component {
  componentWillMount() {
    if(this.props.user.get('_id')){
      browserHistory.push('/');
    }
  }

  componentWillUpdate() {
    if(this.props.user.get('_id')){
      browserHistory.push('/');
    }
  }

  handleLFSubmit = (values) => {
    this.props.login({user: {
      email: values.get('email'),
      password: values.get('password'),
    }}).then((res) => {
      alert("success");
      browserHistory.push('/');
    }).catch((err) => {
      alert(err.message);
    });
  }

  render() {
    return(
      <div className="wrapper">
        <LoginForm handleLFSubmit={this.handleLFSubmit} />
      </div>                
    )    
  }
}

Login.propTypes = {
  user: PropTypes.instanceOf(Immutable.Map),
  login: PropTypes.func
};

// What data from the store shall we send to the component?
const mapStateToProps = createStructuredSelector({
  user: getUserData()
});

// Any actions to map to the component?
const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
