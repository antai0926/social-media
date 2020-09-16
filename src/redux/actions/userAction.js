import axios from 'axios';

import TYPES from '../types';

const { SET_USER, SET_UNAUTHENTICATED } = TYPES.USER;
const { LOADING_UI, CLEAR_ERRORS, SET_ERRORS } = TYPES.UI;

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const loginUser = (userData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post('/login', userData);
    setAuthorizationHeader(res.data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push('/');
  } catch (err) {
    console.error(err.response.data);
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

export const signupUser = (newUserData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post('/signup', newUserData);
    setAuthorizationHeader(res.data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push('/');
  } catch (err) {
    const errMessage = err.response ? err.response.data : err;
    console.error(errMessage);
    dispatch({ type: SET_ERRORS, payload: errMessage });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => async (dispatch) => {
  const res = await axios.get('/user');
  dispatch({ type: SET_USER, payload: res.data });
};
