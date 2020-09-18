import React, { Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

//Redux
import { useDispatch, useSelector } from 'react-redux';

//Component
import MyButton from '../util/MyButton';
import { uploadImage } from '../redux/actions/userAction';
import EditDetails from '../component/EditDetails';

const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: theme.palette.primary.main,
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px',
    },
  },
});

const Profile = (props) => {
  const dispatch = useDispatch();
  const {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
    authenticated,
  } = useSelector((state) => state.user);
  const { classes } = props;

  const imgInputRef = useRef(null);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    dispatch(uploadImage(formData));
  };

  const handleEditPicture = (event) => {
    imgInputRef.current.click();
  };

  const AutenticatedView = () => {
    return (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              ref={imgInputRef}
              type="file"
              id="ImageInput"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <MyButton
              tip="Edit profile picture"
              onClick={handleEditPicture}
              btnClassName="button"
            >
              <AddPhotoAlternateIcon color="primary" />
            </MyButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {' '}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{' '}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
          <Grid container justify="flex-end">
            <Grid item>
              <EditDetails />
            </Grid>
          </Grid>
        </div>
      </Paper>
    );
  };

  const UnAutenticatedView = () => {
    return (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    );
  };

  const profileMarkup = !loading ? (
    authenticated ? (
      <AutenticatedView />
    ) : (
      <UnAutenticatedView />
    )
  ) : (
    <p>Loading...</p>
  );

  return profileMarkup;
};

export default withStyles(styles)(Profile);
