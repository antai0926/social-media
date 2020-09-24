import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Notifications from './Notifications';

//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

//component
import MyButton from '../../util/MyButton';
import { logoutUser } from '../../redux/actions/userAction';
import PostScream from '../scream/PostScream';

const NavBar = (props) => {
  const { authenticated, logoutUser } = props;

  const AuthenticatedView = () => {
    const handleLogout = () => {
      logoutUser();
    };
    return (
      <React.Fragment>
        <PostScream />
        <Link to="/">
          <MyButton tip="Home">
            <HomeIcon color="primary" />
          </MyButton>
        </Link>
        <Notifications />
        <MyButton tip="Logout" onClick={handleLogout}>
          <MeetingRoomIcon color="primary" />
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
      <Toolbar className="nav-container">
        {authenticated ? <AuthenticatedView /> : <UnAuthenticatedView />}
      </Toolbar>
    </AppBar>
  );
};
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});
const mapActionsToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(NavBar);
