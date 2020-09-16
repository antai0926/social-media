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

const theme = createMuiTheme(themeObject);

function App() {

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
