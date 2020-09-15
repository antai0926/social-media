import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import home from './pages/Home';
import signup from './pages/Signup';
import login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route paht="/" component={home} />
          <Route paht="/login" component={login} />
          <Route paht="/signup" component={signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
