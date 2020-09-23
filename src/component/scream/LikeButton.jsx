import React from 'react';
import { Link } from 'react-router-dom';
//Compenent
import MyButton from '../../util/MyButton';
//MUI
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
//Redux
import { likeScream, unlikeScream } from '../../redux/actions/dataAction';
import { connect } from 'react-redux';

const LikeButton = (props) => {
  const { screamId, likeScream, unlikeScream, user } = props;
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
      <MyButton tip="Undo Like" onClick={() => unlikeScream(screamId)}>
        <FavoriteIcon color="primary"></FavoriteIcon>
      </MyButton>
    );
  }
  return (
    <MyButton tip="Like" onClick={() => likeScream(screamId)}>
      <FavoriteBorder color="primary"></FavoriteBorder>
    </MyButton>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  likeScream,
  unlikeScream,
};
export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
