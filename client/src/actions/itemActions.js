import axios from 'axios';
import { GET_ITEMS, DELETE_ITEM, ADD_ITEM, ITEMS_LOADING } from '../types/types';
import { tokenConfig } from './authActions';
import { getErrors } from './errorActions';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());

  axios.get('/api/items')
    .then(res => dispatch(
      {
        type: GET_ITEMS,
        payload: res.data
      }
    ))
    .catch(err => {
      dispatch(getErrors(err.response.data, err.response.status));
    });
};

export const addItem = (item) => (dispatch, getState) => {
  // attach token to req header
  axios.post('/api/items', item, tokenConfig(getState))
  .then(res => dispatch(
    {
      type: ADD_ITEM,
      payload: res.data
    }
    ))
    .catch(err => {
      dispatch(getErrors(err.response.data, err.response.status));
    });
  };
  
export const deleteItem = (id) => (dispatch, getState) => {
  // attach token to req header
  axios.delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res => dispatch(
      {
        type: DELETE_ITEM,
        payload: id
      }
    ))
    .catch(err => {
      dispatch(getErrors(err.response.data, err.response.status));
    });
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
