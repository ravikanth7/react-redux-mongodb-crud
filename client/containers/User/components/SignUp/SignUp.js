/**
 * SignUp Container
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link, browserHistory } from 'react-router';

// Actions
import { register } from '../../UserActions';

// The component we're mapping to
import SignUpForm from './SignUpForm';

import { createStructuredSelector } from 'reselect';
import { getUserData } from '../../../../selectors';

export class SignUp extends Component {
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
    this.props.register({user: {
      name: values.get('name'),
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
        <SignUpForm handleLFSubmit={this.handleLFSubmit} />
      </div>                
    )    
  }
}

SignUp.propTypes = {
  user: PropTypes.instanceOf(Immutable.Map),
  register: PropTypes.func
};

// What data from the store shall we send to the component?
const mapStateToProps = createStructuredSelector({
  user: getUserData()
});

// Any actions to map to the component?
const mapDispatchToProps = {
  register
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
