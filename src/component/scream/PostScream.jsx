import React, { Fragment, useState, useEffect, useCallback } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { postScream, clearErrors } from '../../redux/actions/dataAction';

const styles = (theme) => ({
  ...theme.custom,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%',
  },
});

const PostScream = ({ classes }) => {
  const UI = useSelector((state) => state.UI);
  const { loading, errors } = UI;
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    dispatch(clearErrors());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postScream({ body }));
  };

  useEffect(() => {
    if (!errors.body && !loading) {
      setBody('');
      handleClose();
    }
  }, [errors.body, loading, handleClose]);

  return (
    <Fragment>
      <MyButton onClick={handleOpen} tip="Post a Scream!">
        <AddIcon />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREMS!!"
              multiline
              row="3"
              placeholder="Scream at your fellow apes"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={(event) => setBody(event.target.value)}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(PostScream);
