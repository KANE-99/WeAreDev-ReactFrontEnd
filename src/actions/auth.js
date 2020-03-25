import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './type';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

import axios from 'axios';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    name,
    email,
    password
  });

  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(setAlert('Registration Successful', 'success', 5000));
  } catch (error) {
    const err = error.response.data.errors;

    if (err)
      err.forEach(error => {
        dispatch(setAlert(error.msg, 'danger', 5000));
      });

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    email,
    password
  });

  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(setAlert('Login Successful', 'success', 5000));
  } catch (error) {
    const err = error.response.data.errors;

    if (err)
      err.forEach(error => {
        dispatch(setAlert(error.msg, 'danger', 5000));
      });

    dispatch({
      type: LOGIN_FAIL
    });
  }
};
