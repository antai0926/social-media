import React from 'react';
import './App.css';

//MUI
import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeObject from './util/theme';

//ThirdParty
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './redux/store';

//Component
import NavBar from './component/NavBar.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthRoute from './util/AuthRoute';

const theme = createMuiTheme(themeObject);

const token = localStorage.FBIdToken;
let authenticated = false;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    // window.location.href = '/login';
    alert('您的登入時間已超過，請重新登入');
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute
                exact
                path="/login"
                component={Login}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/signup"
                component={Signup}
                authenticated={authenticated}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
