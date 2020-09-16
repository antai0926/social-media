import axios from 'axios';

import TYPES from '../types';

const { SET_USER } = TYPES.USER;
const { LOADING_UI, CLEAR_ERRORS, SET_ERRORS } = TYPES.UI;

export const loginUser = (userData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post('/login', userData);
    const FBIdToken = `Bearer ${res.data.token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push('/');
  } catch (err) {
    console.error(err.response.data);
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

export const getUserData = () => async (dispatch) => {
  const res = await axios.get('/user');
  dispatch({ type: SET_USER, payload: res.data });
};
