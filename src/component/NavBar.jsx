import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

//MUI
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import Notifications from '@material-ui/icons/Notifications';

//component
import MyButton from '../util/MyButton';

const NavBar = () => {
  const authenticated = useSelector((state) => state.user.authenticated);

  const AuthenticatedView = () => {
    return (
      <React.Fragment>
        <MyButton tip="Post a Scream!">
          <AddIcon color="primary" />
        </MyButton>
        <MyButton tip="Home">
          <HomeIcon color="primary" />
        </MyButton>
        <MyButton tip="Notifications">
          <Notifications color="primary" />
        </MyButton>
      </React.Fragment>
    );
  };
  const UnAuthenticatedView = () => {
    return (
      <React.Fragment>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/signup">
          Signup
        </Button>
      </React.Fragment>
    );
  };

  return (
    <AppBar color="primary">
      <ToolBar className="nav-container">
        {authenticated ? <AuthenticatedView /> : <UnAuthenticatedView />}
      </ToolBar>
    </AppBar>
  );
};

export default NavBar;
