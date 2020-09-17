import React from 'react';
import './App.css';

//MUI
import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeObject from './util/theme';

//ThirdParty
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Component
import NavBar from './component/NavBar.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthRoute from './util/AuthRoute';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';

import jwtDecode from 'jwt-decode';
import axios from 'axios';
import TYPES from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userAction';

const theme = createMuiTheme(themeObject);

function App() {
  const token = localStorage.FBIdToken;
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      alert('您的登入時間已超過，請重新登入');
      store.dispatch(logoutUser());
      if (!String(window.location.href).includes('/login')) {
        window.location.href = '/login';
      }
    } else {
      store.dispatch({ type: TYPES.USER.SET_AUTHENTICATED });
      axios.defaults.headers.common['Authorization'] = token;
      store.dispatch(getUserData());
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/signup" component={Signup} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
