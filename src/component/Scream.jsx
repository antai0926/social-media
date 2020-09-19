import React from 'react';

//Third-Party
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//Compenent
import MyButton from '../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
//Redux
import { likeScream, unlikeScream } from '../redux/actions/dataAction';
import { useDispatch, useSelector } from 'react-redux';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
};

const Scream = (props) => {
  const {
    classes,
    scream: {
      body,
      createdAt,
      userImage,
      userHandle,
      likeCount,
      commentCount,
      screamId,
    },
  } = props;

  const user = useSelector((state) => state.user);

  const {
    authenticated,
    credentials: { handle },
  } = user;

  const likedScream = () => {
    if (user.likes && user.likes.find((like) => like.screamId === screamId)) {
      return true;
    }
    return false;
  };

  const LikeButton = () => {
    const dispatch = useDispatch();
    if (!authenticated) {
      return (
        <MyButton tip="Like">
          <Link to="/login">
            <FavoriteBorder color="primary" />
          </Link>
        </MyButton>
      );
    }
    if (likedScream()) {
      return (
        <MyButton
          tip="Undo Like"
          onClick={() => dispatch(unlikeScream(screamId))}
        >
          <FavoriteIcon color="primary"></FavoriteIcon>
        </MyButton>
      );
    }
    return (
      <MyButton tip="Like" onClick={() => dispatch(likeScream(screamId))}>
        <FavoriteBorder color="primary"></FavoriteBorder>
      </MyButton>
    );
  };

  const DeleteButton = () => {
    if (authenticated && userHandle === handle) {
      return <DeleteScream screamId={screamId} />;
    }
    return null;
  };

  dayjs.extend(relativeTime);
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        <DeleteButton />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton />
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
        <ScreamDialog screamId={screamId} userHandle={userHandle} />
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Scream);
