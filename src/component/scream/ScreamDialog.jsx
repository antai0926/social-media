import React, { Fragment, useCallback, useEffect, useState } from 'react';
import MyButton from '../../util/MyButton';
import ScreamDialogMarkup from './ScreamDialogMarkup';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

// Icons
import CloseIcon from '@material-ui/icons/Close';

// Redux stuff
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataAction';

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
  const { classes, screamId, openDialog, getScream } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
    getScream(screamId);
  }, [screamId, getScream]);

  const handleClose = () => {
    setOpen(false);
    props.clearErrors();
  };

  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
  }, [handleOpen, openDialog]);

  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          <ScreamDialogMarkup />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
const mapActionsToProps = {
  getScream,
  clearErrors,
};

export default connect(
  null,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
