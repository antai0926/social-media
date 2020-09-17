import TYPES from '../types';

const {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} = TYPES.USER;

const INITIAL_STATE = {
  authenticated: false,
  loading: false,
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
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default userReducer;
