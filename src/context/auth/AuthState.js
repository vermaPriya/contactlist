import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('contact-token'),
    isAuthenticated: false,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    let id = null;
    if (localStorage.getItem('contact-token')) {
      id = JSON.parse(localStorage.getItem('contact-token'));
    }

    try {
      const res = await axios.get(`/users/${id}`);

      if (res) {
        const { id, firstName } = res.data;
        dispatch({ type: USER_LOADED, payload: { id, firstName } });
      }
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Login User
  const login = async (email, password) => {
    try {
      const res = await axios.get(`/users?email=${email}&password=${password}`);

      if (res.data[0]) {
        const { id, firstName } = res.data[0];

        dispatch({ type: LOGIN_SUCCESS, payload: { id, firstName } });
        loadUser();
      } else {
        dispatch({ type: LOGIN_FAIL, payload: 'Incorrect email or password' });
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAIL });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        error: state.error,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
