import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
//MUI
import Grid from '@material-ui/core/Grid';
//Component
import Scream from '../component/scream/Scream';
import Profile from '../component/profile/Profile';
import { getScreams } from '../redux/actions/dataAction';
import ScreamSkeleton from '../util/ScreamSkeleton';
//Redux
import { connect } from 'react-redux';

const Home = (props) => {
  const { screams, getScreams, loading } = props;

  useEffect(() => {
    getScreams();
  }, [getScreams]);

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        {!loading ? (
          screams.map((scream) => (
            <Scream key={scream.screamId} scream={scream} />
          ))
        ) : (
          <ScreamSkeleton />
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  screams: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  screams: state.data.screams,
  loading: state.data.loading,
});
const mapActionsToProps = { getScreams };

export default connect(mapStateToProps, mapActionsToProps)(Home);
