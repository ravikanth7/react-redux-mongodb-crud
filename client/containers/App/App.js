import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';

// Import Components
import Login from '../../containers/User/components/Login/Login';
import SignUp from '../../containers/User/components/SignUp/SignUp';
import DevTools from './components/DevTools';
import { createStructuredSelector } from 'reselect';

import { validate as authenticateUser, logout as logOut } from '../User/UserActions'
import { getUserData,getError,getErrorMsg } from '../../selectors';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false      
    };
  }

  componentDidMount() {
    this.setState({isMounted: true});
    const token = localStorage.getItem('_u_t');
    if(token != undefined && token != '') {
      this.props.authenticateUser({token:token}) 
    }    
  }

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="Product Management Dashboard"
            titleTemplate="Product Management Dashboard"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
              {
                name: 'description', 
                content: 'Product Management Dashboard'
              },
              {
                name: 'keywords',
                keywords: 'Product Management Dashboard'
              }
            ]}
          />
          <div>
            <div className="container">
              { this.props.user.get("_id") && <nav className="navbar navbar-default nav-menu">
                                                <div className="navbar-header">
                                                  <div className="navbar-brand">{this.props.user.get('name')} </div>
                                                </div>
                                                <div className="collapse navbar-collapse button-menu">
                                                  <ul className="nav navbar-nav navbar-right">
                                                    <li className="dropdown">
                                                      <Link onClick={() => {this.props.logOut();}} className="dropdown-toggle logout-button">
                                                        <span className="glyphicon glyphicon-user" />&nbsp;
                                                        <strong>Logout</strong>
                                                      </Link>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </nav>
              }
              { this.props.user.get("_id") && React.cloneElement(this.props.children, { user: this.props.user }) }
              { typeof document == "object" && document.location.pathname != '/register' && !this.props.user.get("_id") && <Login /> }
              { typeof document == "object" && document.location.pathname == '/register' && !this.props.user.get("_id") && <SignUp /> }
            </div>           
          </div>
        </div>
      </div>          
    )
  }  
}

App.propTypes = {
  children: PropTypes.object,
  authenticateUser: PropTypes.func,
  logOut: PropTypes.func,
  error: PropTypes.bool,
  errormsg: PropTypes.string
};

// Retrieve data from state as props
const mapStateToProps = createStructuredSelector({
    error: getError(),
    errormsg: getErrorMsg(),
    user: getUserData()
});

// Any actions to map to the component?
const mapDispatchToProps = {
  authenticateUser,
  logOut
};

export default connect(mapStateToProps, mapDispatchToProps)(App);  