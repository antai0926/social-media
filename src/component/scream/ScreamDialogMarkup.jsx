import React from 'react';

import Comments from './Comments';
import CommentForm from './CommentForm';
import ScreamContent from './ScreamContent';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

//Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
  ...theme.custom,
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
});

const ScreamDialogMarkup = (props) => {
  const {
    scream: { userImage, screamId },
    comments,
    loading,
    scream,
    classes,
  } = props;

  if (loading) {
    return (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    );
  }
  return (
    <Grid container spacing={3}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <ScreamContent scream={scream} />
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm screamId={screamId} />
      <Comments comments={comments} />
    </Grid>
  );
};

const mapStateToPorps = (state) => ({
  scream: state.data.scream,
  comments: state.data.comments,
  loading: state.UI.loading,
});

export default connect(mapStateToPorps)(withStyles(styles)(ScreamDialogMarkup));
