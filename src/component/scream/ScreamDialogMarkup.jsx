import React from 'react';

import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import MyButton from '../../util/MyButton';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';

//Redux
import { useSelector } from 'react-redux';

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
  const { classes, screamId } = props;
  const data = useSelector((state) => state.data);
  const {
    body,
    createdAt,
    likeCount,
    commentCount,
    userImage,
    userHandle,
  } = data.scream;

  const { comments } = data;

  const { loading } = useSelector((state) => state.UI);

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
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format('MMMM DD YYYY, h:mm a')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm screamId={screamId} />
      <Comments comments={comments} />
    </Grid>
  );
};

export default withStyles(styles)(ScreamDialogMarkup);
