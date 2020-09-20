import React, { useEffect } from 'react';
//MUI
import Grid from '@material-ui/core/Grid';
//Component
import Scream from '../component/scream/Scream';
import Profile from '../component/profile/Profile';
import { getScreams } from '../redux/actions/dataAction';
//Redux
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScreams());
  }, [dispatch]);

  const screams = useSelector((state) => state.data.screams);
  const recentScreamMarkup = screams ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        {recentScreamMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
