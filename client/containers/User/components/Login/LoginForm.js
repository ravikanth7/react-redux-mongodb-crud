import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { required, email } from '../../../../lib/validate'
import { Link } from 'react-router';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <p>
        <input className="form-control" {...input} type={type} placeholder={label} />
      </p>
      {touched && error && <p className="text-center col-error form-error">{error}</p>}
    </div>  
);

const LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting, handleLFSubmit } = props;
  return (
    <form className="form-signin" onSubmit={handleSubmit(handleLFSubmit)}>
                      <h3 className="form-signin-heading">Welcome Back! Please Sign In</h3>
                      <hr className="colorgraph" /><br />
      <Field name="email" type="email" component={renderField} label="Email" validate={[required, email]} />
      <Field name="password" type="password" component={renderField} label="Password" validate={required} />

        <input className="btn btn-lg btn-primary btn-block" type="submit" value="Login" disabled={pristine || submitting} />
        <div className="new-account">
          <Link to="/register"> Don't have an account? Click here to create one. </Link>
        </div>
    </form>
  );
};

export default reduxForm({
  form: 'loginForm', // a unique identifier for this form
})(LoginForm);
