import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { required } from '../../../../lib/validate'
import { Link } from 'react-router';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className="form-group">
      <label className="col-md-4 control-label">{label}</label>  
      <div className="col-md-4">
        <input className="form-control input-md" {...input} type={type} placeholder={label} />
      </div>
      {touched && error && <p className="text-center col-error form-error">{error}</p>}
    </div>  
);

class EditForm extends Component {
  componentDidMount() {
    this.props.initialize({name: this.props.prd.name, code: this.props.prd.code, quantity: this.props.prd.quantity, expiry: this.props.prd.expiry})
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, handleEFSubmit } = this.props;
    return (
        <form className="form-horizontal" onSubmit={handleSubmit(handleEFSubmit)}>
          <fieldset>
            <legend className="edit_prd_hd">EDIT PRODUCT</legend>

        <Field name="name" type="text" component={renderField} label="Name" validate={[required]} />
        <Field name="code" type="text" component={renderField} label="Code" validate={[required]} />
        <Field name="quantity" type="text" component={renderField} label="Quantity" validate={[required]} />
        <Field name="expiry" type="text" component={renderField} label="Expiry" validate={[required]} />

          <input className="edit_prd_btn btn btn-lg btn-primary btn-block" type="submit" value="Edit Product" disabled={pristine || submitting} />
          </fieldset>
            <div className="back_prds">
              <Link to="/products">
                <button className="btn btn-lg btn-primary btn-block" type="button">
                  &lt;&lt; All Products 
                </button>
              </Link>  
            </div>          
        </form>
    );
  }
};

export default reduxForm({
  form: 'editForm', // a unique identifier for this form
})(EditForm);
