/**
 * Edit Container
 *
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link, browserHistory } from 'react-router';

// Actions
import { editprd, fetchprd } from '../../ProductsActions';

// The component we're mapping to
import EditForm from './EditForm';

import { createStructuredSelector } from 'reselect';

export class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      prd: {}
    };
  }

  componentDidMount() {
    this.props.fetchprd(this.props.routeParams.id).then((res) => {
      this.setState({prd: res});
    }).catch((err) => {
      console.log(err);
    });;
  }

  handleEFSubmit = (values) => {
    this.props.editprd({product: {
      name: values.get('name'),
      code: values.get('code'),
      quantity: values.get('quantity'),
      expiry: values.get('expiry'),
    }},this.props.routeParams.id).then((res) => {
      alert("Product updated!!!");
    }).catch((err) => {
      alert("Error");
    });
  }

  render() {
    const { prd } = this.state;
    return(
      <div className="wrapper">
        { prd._id && <EditForm handleEFSubmit={this.handleEFSubmit} prd={prd} /> }
      </div>                
    )    
  }
}

Edit.propTypes = {
  editprd: PropTypes.func
};

// What data from the store shall we send to the component?
const mapStateToProps = createStructuredSelector({});

// Any actions to map to the component?
const mapDispatchToProps = {
  fetchprd,
  editprd
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
