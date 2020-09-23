import React, { useEffect } from 'react';
//MUI
import Grid from '@material-ui/core/Grid';
//Component
import Scream from '../component/scream/Scream';
import Profile from '../component/profile/Profile';
import { getScreams } from '../redux/actions/dataAction';
//Redux
import { connect } from 'react-redux';

const Home = (props) => {
  const { screams, getScreams } = props;

  useEffect(() => {
    getScreams();
  }, [getScreams]);

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        {screams ? (
          screams.map((scream) => (
            <Scream key={scream.screamId} scream={scream} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => ({
  screams: state.data.screams,
});
const mapActionsToProps = { getScreams };

export default connect(mapStateToProps, mapActionsToProps)(Home);
