import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { required } from '../../../../lib/validate'
import { Link } from 'react-router';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className="form-group">
      <label className="col-md-4 control-label">{label.split("(")[0]}</label>  
      <div className="col-md-4">
        <input className="form-control input-md" {...input} type={type} placeholder={label} />
      </div>
      {touched && error && <p className="text-center col-error form-error">{error}</p>}
    </div>  
);

const NewForm = props => {
  const { handleSubmit, pristine, reset, submitting, handleNFSubmit } = props;
  return (
      <form className="form-horizontal" onSubmit={handleSubmit(handleNFSubmit)}>
        <fieldset>
          <legend className="add_prd_hd">ADD PRODUCT</legend>

      <Field name="name" type="text" component={renderField} label="Name" validate={[required]} />
      <Field name="code" type="text" component={renderField} label="Code" validate={[required]} />
      <Field name="quantity" type="text" component={renderField} label="Quantity" validate={[required]} />
      <Field name="expiry" type="text" component={renderField} label="Expiry(2017-07-08T08:18:17.412Z)" validate={[required]} />

        <input className="add_prd_btn btn btn-lg btn-primary btn-block" type="submit" value="Add Product" disabled={pristine || submitting} />
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
};

export default reduxForm({
  form: 'newForm', // a unique identifier for this form
})(NewForm);
