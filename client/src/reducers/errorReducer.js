import { GET_ERRORS, CLEAR_ERRORS } from '../types/types';

const initialState = {
  msg: {},
  status: null,
  id: null
};

export default (state=initialState, action) => {
  switch(action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        state: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_ERRORS:
      return initialState;
    default:
      return state;
  }
}