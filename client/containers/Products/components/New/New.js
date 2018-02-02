/**
 * New Container
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link, browserHistory } from 'react-router';

// Actions
import { addprd } from '../../ProductsActions';

// The component we're mapping to
import NewForm from './NewForm';

import { createStructuredSelector } from 'reselect';

export class New extends Component {
  handleNFSubmit = (values) => {
    this.props.addprd({product: {
      name: values.get('name'),
      code: values.get('code'),
      quantity: values.get('quantity'),
      expiry: values.get('expiry'),
    }}).then((res) => {
      alert("Product added!!!");
    }).catch((err) => {
      alert("Error");
    });
  }

  render() {
    return(
      <div className="wrapper">
        <NewForm handleNFSubmit={this.handleNFSubmit} />
      </div>                
    )    
  }
}

New.propTypes = {
  addprd: PropTypes.func
};

// What data from the store shall we send to the component?
const mapStateToProps = createStructuredSelector({});

// Any actions to map to the component?
const mapDispatchToProps = {
  addprd
};

export default connect(mapStateToProps, mapDispatchToProps)(New);
