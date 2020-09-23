import React, { Fragment, useState } from 'react';
import MyButton from '../../util/MyButton';
// Redux stuff
import { editUserDetails } from '../../redux/actions/userAction';
// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';

const styles = (theme) => ({
  ...theme.custom,
});

const EditDetails = (props) => {
  const { classes, credentials, editUserDetails } = props;
  const [bio, setBio] = useState(credentials.bio ? credentials.bio : '');
  const [website, setWebsite] = useState(
    credentials.website ? credentials.website : ''
  );
  const [location, setLocation] = useState(
    credentials.location ? credentials.location : ''
  );
  const [open, setOpen] = useState(false);

  const mapUserDetailsToState = (credentials) => {
    setBio(credentials.bio ? credentials.bio : '');
    setWebsite(credentials.website ? credentials.website : '');
    setLocation(credentials.location ? credentials.location : '');
  };

  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(credentials);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const userDetails = {
      bio,
      website,
      location,
    };
    editUserDetails(userDetails);
    handleClose();
  };

  return (
    <Fragment>
      <MyButton
        tip="Edit Details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              tpye="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              fullWidth
            />
            <TextField
              name="website"
              tpye="text"
              label="Website"
              placeholder="Your personal/professinal website"
              className={classes.textField}
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              fullWidth
            />
            <TextField
              name="location"
              tpye="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});
const mapActionsToProps = { editUserDetails };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(EditDetails));
