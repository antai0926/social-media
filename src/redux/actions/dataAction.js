import axios from 'axios';

import TYPES from '../types';

const {
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_DATA,
  STOP_LOADING_UI,
} = TYPES.UI;
const {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
} = TYPES.DATA;

/**Get Screams */
export const getScreams = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    const res = await axios.get('/screams');
    dispatch({ type: SET_SCREAMS, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_SCREAMS, payload: [] });
  }
};
/**Get a scream */
export const getScream = (screamId) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.get(`/scream/${screamId}`);
    dispatch({ type: SET_SCREAM, payload: res.data });
    dispatch({ type: STOP_LOADING_UI });
  } catch (err) {
    console.error(err);
  }
};
/**Post a Scream */
export const postScream = (newScream) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post('/scream', newScream);
    dispatch({ type: POST_SCREAM, payload: res.data });
    dispatch({ type: CLEAR_ERRORS });
  } catch (err) {
    console.error(err.response.data);
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

/**Like Scream */
export const likeScream = (screamId) => async (dispatch) => {
  try {
    const res = await axios.get(`/scream/${screamId}/like`);
    dispatch({ type: LIKE_SCREAM, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
/**UnLike Scream */
export const unlikeScream = (screamId) => async (dispatch) => {
  try {
    const res = await axios.get(`/scream/${screamId}/unlike`);
    dispatch({ type: UNLIKE_SCREAM, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
/**Delete Scream */
export const deleteScream = (screamId) => async (dispatch) => {
  try {
    await axios.delete(`/scream/${screamId}`);
    dispatch({ type: DELETE_SCREAM, payload: screamId });
  } catch (err) {
    console.error(err);
  }
};
/**Clear Errors */
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
