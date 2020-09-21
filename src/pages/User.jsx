import React, { useEffect } from 'react';
//Component
import Scream from '../component/scream/Scream';
import StaticProfile from '../component/profile/StaticProfile';
// import ScreamSkeleton from '../util/ScreamSkeleton';
// import ProfileSkeleton from '../util/ProfileSkeleton';
//MUI
import Grid from '@material-ui/core/Grid';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails } from '../redux/actions/dataAction';

const User = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const { loading } = data;
  const profile = data.userDetails.user;
  const screams = data.screams;
  useEffect(() => {
    const handle = props.match.params.handle;
    console.log('handle', handle);
    dispatch(getUserDetails(handle));
  }, [props.match.params.handle, dispatch]);

  const ScreamsMarkup = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (!screams || screams.length === 0) {
      return <p>No screams from this user</p>;
    }
    return screams.map((scream) => (
      <Scream key={scream.screamId} scream={scream} />
    ));
  };

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        <ScreamsMarkup />
      </Grid>
      <Grid item sm={4} xs={12}>
        {!profile || loading ? (
          <p>Loading...</p>
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
};

export default User;
