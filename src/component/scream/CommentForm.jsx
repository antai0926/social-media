import React, { useEffect, useState } from 'react';
// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux stuff
import { submitComment } from '../../redux/actions/dataAction';
import { useDispatch, useSelector } from 'react-redux';

const styles = (theme) => ({
  ...theme.custom,
});
const CommentForm = ({ classes, screamId }) => {
  const UI = useSelector((state) => state.UI);
  const { loading, errors } = UI;
  const { authenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [body, setBody] = useState('');

  useEffect(() => {
    if (!errors.comment && !loading) {
      setBody('');
    }
  }, [errors.comment, loading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(submitComment(screamId, { body }));
  };

  return authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          fullWidth
          className={classes.TextField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;
};

export default withStyles(styles)(CommentForm);
