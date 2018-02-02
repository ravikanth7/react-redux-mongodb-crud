/**
 * HomePage Screen
 *
    <HomePage />
 *
 */
import React from 'react';
import { Link } from 'react-router';

/* Component ==================================================================== */
export class HomePage extends React.PureComponent {
  render () {
    const { user } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">

          <div className="center">
            <h1>Welcome {user.get('name')} to the Product Management Dashboard</h1>
            <div className="view_prds">
              <Link to="/products">
                <button className="btn btn-lg btn-primary btn-block" type="button">
                  View Products 
                </button>
              </Link>
            </div>            
          </div>

        </div>
      </div>
    )
  }
}

/* Export Component ==================================================================== */
export default HomePage;