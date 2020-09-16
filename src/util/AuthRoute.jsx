import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import jwtDecode from 'jwt-decode';
import axios from 'axios';
import TYPES from '../redux/types';
import { logoutUser, getUserData } from '../redux/actions/userAction';

const AuthRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.FBIdToken;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        alert('您的登入時間已超過，請重新登入');
        dispatch(logoutUser());
        if (!String(window.location.href).includes('/login')) {
          window.location.href = '/login';
        }
      } else {
        dispatch({ type: TYPES.USER.SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token;
        dispatch(getUserData());
      }
    }
  }, [dispatch]);

  const authenticated = useSelector((state) => state.user.authenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
