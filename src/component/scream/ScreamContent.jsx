import React from 'react';

//Third-Party
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

//Compenent
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';

//MUI
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';

const ScreamContent = ({ DeleteButton, scream }) => {
  const {
    body,
    createdAt,
    userHandle,
    likeCount,
    commentCount,
    screamId,
  } = scream;
  return (
    <React.Fragment>
      <Typography
        variant="h5"
        component={Link}
        to={`/users/${userHandle}`}
        color="primary"
      >
        {userHandle}
      </Typography>
      {DeleteButton && <DeleteButton />}
      <Typography variant="body2" color="textSecondary">
        {dayjs(createdAt).fromNow()}
      </Typography>
      <Typography variant="body1">{body}</Typography>
      <LikeButton screamId={screamId} />
      <span>{likeCount} Likes</span>
      <MyButton tip="comments">
        <ChatIcon color="primary" />
      </MyButton>
      <span>{commentCount} comments</span>
    </React.Fragment>
  );
};

export default ScreamContent;
