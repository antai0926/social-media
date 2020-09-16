import React, { useEffect, useState } from 'react';
//Third Part
import axios from 'axios';
//MUI
import Grid from '@material-ui/core/Grid';
//Component
import Scream from '../component/Scream';

const Home = () => {
  const [screams, setScreams] = useState([]);
  useEffect(() => {
    const fetchScream = async () => {
      try {
        const res = await axios.get('/screams');
        setScreams(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchScream();
  }, []);

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
        <p>Profile...</p>
      </Grid>
    </Grid>
  );
};

export default Home;
