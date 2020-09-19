import TYPES from '../types';

const { LOADING_UI, CLEAR_ERRORS, SET_ERRORS, STOP_LOADING_UI } = TYPES.UI;
const INITAIL_STATE = {
  loading: false,
  errors: {},
};

const uiReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: {},
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default uiReducer;
