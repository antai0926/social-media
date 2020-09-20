import React from 'react';
import { Link } from 'react-router-dom';
//Compenent
import MyButton from '../../util/MyButton';
//MUI
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
//Redux
import { likeScream, unlikeScream } from '../../redux/actions/dataAction';
import { useSelector, useDispatch } from 'react-redux';

const LikeButton = ({ screamId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { authenticated } = user;

  const likedScream = () => {
    if (user.likes && user.likes.find((like) => like.screamId === screamId)) {
      return true;
    }
    return false;
  };
  if (!authenticated) {
    return (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
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

export default LikeButton;
