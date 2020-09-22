import TYPES from '../types';

const {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
  SET_USER_DETAILS,
  SET_COMMENTS,
} = TYPES.DATA;

const {
  LOADING_DATA,
} = TYPES.UI;

const INITIAL_STATE = {
  screams: [],
  scream: [],
  loading: false,
  userDetails: {},
  comments: [],
};

const dataReducer = (state = INITIAL_STATE, action) => {
  let index;
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      //找出screams中like該筆scream的index並將回傳的新的scream更新回screams
      index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      //當打開screamDialog時click like or unlike update scream state
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state,
        screams: [...state.screams],
      };

    case DELETE_SCREAM:
      index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(index, 1);
      return {
        ...state,
        screams: [...state.screams],
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    case SET_COMMENTS:
      return {
        ...state,
        comments: [...action.payload],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default dataReducer;
