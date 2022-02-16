import React, { useState, useEffect, useContext } from 'react';
import { isEmpty, isEmail } from '../utils/validation';

import Alert from '../layout/Alert';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = () => {
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    email: '',
    password: '',
    errors: {},
  });
  const { email, password, errors } = user;

  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
    }
    clearErrors();
    // eslint-disable-next-line
  }, [error]);

  const onSubmit = (e) => {
    e.preventDefault();

    // Email
    if (!isEmail(email)) {
      errors.email = {
        param: 'email',
        msg: 'Email is not valid',
      };
    } else {
      delete errors.email;
    }

    // Password
    if (isEmpty(password)) {
      errors.password = {
        param: 'password',
        msg: 'Password is required',
      };
    } else {
      delete errors.password;
    }

    setUser({ ...user, errors });

    if (Object.keys(errors).length === 0) {
      setAlert('Please wait...', 'warning');
      login(email, password);
    }
  };

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <div className="box-width mt-5 mx-auto">
      <Alert />
      <h1 className="mb-5 text-center">
        Login <span className="text-purple">Account</span>
      </h1>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            className={`form-control ${errors.email && 'is-invalid'}`}
            placeholder="Your Email"
            onChange={onChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.msg}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Password</label>
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password && 'is-invalid'}`}
            placeholder="Your Password"
            onChange={onChange}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.msg}</div>
          )}
        </div>

        <button className="btn btn-purple btn-block mt-4">Login</button>
      </form>
    </div>
  );
};

export default Login;
