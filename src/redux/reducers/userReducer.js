import TYPES from '../types';

const { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } = TYPES.USER;

const INITIAL_STATE = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return INITIAL_STATE;
    case SET_USER:
      return {
        autenticated: true,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
