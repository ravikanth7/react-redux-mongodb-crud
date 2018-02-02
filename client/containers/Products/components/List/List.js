import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link, browserHistory } from 'react-router';

import { createStructuredSelector } from 'reselect';

import { fetchprods } from '../../ProductsActions'
import { getProductsData } from '../../../../selectors';

export class List extends Component {
  componentDidMount() {
    this.props.fetchprods()
  }

  render() {
    const { products } = this.props;
    const prditems = []

    if(products && products.get(0) != undefined) {
      products.map((item) => {
        const id = item.get('_id');
        const name = item.get('name');
        const code = item.get('code');
        const quantity = item.get('quantity');
        const expiry = item.get('expiry');
        let classss = "";

        if(quantity <= 10) {
          classss = "qty_red";
        } else if(quantity <= 30) {
          classss = "qty_orange";
        } else {
          classss = "qty_green"; 
        }

        return prditems.push(
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{code}</td>
              <td className={`qty ${classss}`}>{quantity}</td>
              <td>{expiry}</td>
              <td><Link className="edit_link" to={"/product/edit/"+id}>edit</Link></td>
            </tr>
        )
      });
    }

    return (
        <div>
          <div className="prds_head">
            <h2>Products</h2>
          </div>  
          <div className="add_prd">
            <Link to="/product/new">
              <button className="btn btn-lg btn-primary btn-block" type="button">
                Add Product 
              </button>
            </Link>  
          </div>
          <div className="clearfix"></div>
          <div className="table-responsive">          
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Quantity</th>
                  <th>Expiry</th>
                  <th>Edit</th>
                </tr>
              </thead>
             <tbody>
                {prditems}
             </tbody>
            </table>
          </div>
        </div> 
    )
  }
}

List.propTypes = {
  fetchprods: PropTypes.func,
  products: PropTypes.instanceOf(Immutable.List)
};

// Retrieve data from state as props
const mapStateToProps = createStructuredSelector({
    products: getProductsData()
});

// Any actions to map to the component?
const mapDispatchToProps = {
    fetchprods
};

export default connect(mapStateToProps, mapDispatchToProps)(List);  