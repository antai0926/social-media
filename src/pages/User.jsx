import React, { useEffect, useState } from 'react';
//Component
import Scream from '../component/scream/Scream';
import StaticProfile from '../component/profile/StaticProfile';
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';
//MUI
import Grid from '@material-ui/core/Grid';

//Redux
import { connect } from 'react-redux';
import { getUserDetails } from '../redux/actions/dataAction';

const User = (props) => {
  const [screamIdParam, setScreamIdParam] = useState(null);
  const { data, getUserDetails } = props;
  const { loading, screams } = data;
  const profile = data.userDetails.user;

  useEffect(() => {
    const handle = props.match.params.handle;
    const screamId = props.match.params.screamId;
    if (screamId) {
      setScreamIdParam(screamId);
    }
    getUserDetails(handle);
  }, [props.match.params.handle, props.match.params.screamId, getUserDetails]);

  const screamsMarkup = loading ? (
    <ScreamSkeleton />
  ) : screams === null ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map((scream) => {
      if (scream.screamId !== screamIdParam)
        return <Scream key={scream.screamId} scream={scream} />;
      else return <Scream key={scream.screamId} scream={scream} openDialog />;
    })
  );

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {!profile || loading ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});
const mapActionsToProps = {
  getUserDetails,
};

export default connect(mapStateToProps, mapActionsToProps)(User);
