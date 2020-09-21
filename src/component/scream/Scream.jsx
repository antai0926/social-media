import React from 'react';

//Third-Party
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//Compenent
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import ScreamContent from './ScreamContent';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

//Redux

import { useSelector } from 'react-redux';

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
    scream: { userImage, userHandle, screamId },
  } = props;

  const user = useSelector((state) => state.user);

  const {
    authenticated,
    credentials: { handle },
  } = user;

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
        <ScreamContent DeleteButton={DeleteButton} scream={props.scream} />
        <ScreamDialog screamId={screamId} userHandle={userHandle} />
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Scream);
