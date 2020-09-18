import TYPES from '../types';

const {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
} = TYPES.DATA;

const {
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_DATA,
  STOP_LOADING_UI,
} = TYPES.UI;

const INITIAL_STATE = {
  screams: [],
  scream: [],
  loading: false,
};

const dataReducer = (state = INITIAL_STATE, action) => {
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
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      //找出screams中like該筆scream的index並將回傳的新的scream更新回screams
      const newScreams = state.screams.map((scream) => {
        if (scream.screamId === action.payload.screamId) {
          return action.payload;
        }
        return scream;
      });
      return {
        ...state,
        screams: newScreams,
      };

    default:
      return state;
  }
};

export default dataReducer;
