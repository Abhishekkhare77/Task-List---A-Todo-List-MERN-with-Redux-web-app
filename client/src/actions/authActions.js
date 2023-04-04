import axios from 'axios';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../types/types';
import { getErrors } from './errorActions';

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  
  axios.get('/api/auth/user', tokenConfig(getState))
    .then( res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(getErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      })
    });
  };
  
  
export const register = ({ name, email, password }) => dispatch => {
  const config = jsonHeader();
  const body = JSON.stringify({ name, email, password });
  
  axios.post('/api/users/new', body, config)
  .then(res => dispatch({
    type: REGISTER_SUCCESS,
    payload: res.data
  }))
  .catch(err => {
    dispatch(getErrors(err.response.data, err.response.status, REGISTER_FAIL));
    dispatch({
      type: REGISTER_FAIL
    });
  });
}

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const login = ({ email, password }) => dispatch => {
    const config = jsonHeader();
    const body = JSON.stringify({ email, password });
    
    axios.post('/api/auth', body, config)
    .then(res => dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(getErrors(err.response.data, err.response.status, LOGIN_FAIL));
      dispatch({
        type: LOGIN_FAIL
      });
    });
  }


export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  
  const config = jsonHeader();
  
  if(token){
    config.headers['x-auth-token'] = token;
  }
  
  return config;
};

const jsonHeader = () => {
  return {
    headers: {
      "Content-type": "application/json"
    }
  };
}
