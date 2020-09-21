import React, { Fragment } from 'react';
import MyButton from '../../util/MyButton';
import ScreamDialogMarkup from './ScreamDialogMarkup';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

// Redux stuff
import { getScream, clearErrors } from '../../redux/actions/dataAction';
import { useDispatch, useSelector } from 'react-redux';

import TYPES from '../../redux/types';

const styles = (theme) => ({
  ...theme.custom,
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
});

const ScreamDialog = (props) => {
  const dispatch = useDispatch();
  const expandScream = useSelector((state) => state.UI.expandScream);

  const { classes, screamId } = props;

  const handleOpen = () => {
    dispatch({ type: TYPES.UI.EXPAND_SCREAM });
    dispatch(getScream(screamId));
  };

  const handleClose = () => {
    dispatch({ type: TYPES.UI.CLOSE_SCREAM });
    dispatch(clearErrors());
  };

  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={expandScream} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          <ScreamDialogMarkup screamId={screamId} />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(ScreamDialog);
