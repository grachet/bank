import React, { useState } from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import CloseIcon from "@material-ui/icons/ArrowBack";
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { CircularProgress, Fab, Tooltip, makeStyles, Backdrop } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  speedDial: {
    position: 'fixed',
    bottom: 60,
    right: 60,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ZIndex: 10000
  },
}));

export default function ActionButton({ mainAction, actions, backButton, loading }) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  let handleOpen = () => {
    setOpen(true)
  };

  let handleClose = () => {
    setOpen(false);
  };

  if (backButton) {
    return <Fab onClick={() => window.history.back()} color="default" aria-label="close"
      className={classes.speedDial}
    >
      <CloseIcon />
    </Fab>
  }

  if (!actions) {
    return <Tooltip placement="left" title={mainAction.name}>
      <Fab
        onClick={() => mainAction.action()} color="primary" aria-label="Save"
        className={classes.speedDial}
      >
        {mainAction.icon}
      </Fab>
    </Tooltip>
  }

  return (
    <span>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="speedDial"
        FabProps={{ disabled: loading }}
        className={classes.speedDial}
        icon={mainAction ? mainAction.icon : <SpeedDialIcon />}
        onBlur={handleClose}
        onClick={() => mainAction ? mainAction.action() : setOpen(!open)}
        onClose={handleClose}
        onFocus={handleOpen}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              setOpen(false);
              action.action()
            }}
          />
        ))}
      </SpeedDial>
      {(loading) &&
        <CircularProgress
          color={"secondary"}
          size={68}
          className={classes.speedDial} />}
    </span>
  );
}