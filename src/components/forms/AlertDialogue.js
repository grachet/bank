import React, { useState, useEffect } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import useInterval from '../../customHook/useInterval';
import usePrevious from '../../customHook/usePrevious';


export default function AlertDialog({ autoOkTimer, open, onClose, title, redText,
  text, onOk, okButtonTitle, cancelButtonTitle, closeOnOK, moreButtons }) {

  const [actualTimer, setActualTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const prevOpen = usePrevious(open);
  const prevActualTimer = usePrevious(actualTimer);


  useInterval(() => {
    setActualTimer(actualTimer - 1);
  }, isRunning ? 1000 : null);


  useEffect(() => {
    //if is closing
    if (!open && prevOpen) {
      setIsRunning(false);
    }
    //if is opening
    if (open && !prevOpen) {
      setActualTimer(autoOkTimer)
      setIsRunning(true);
    }
  }, [open, prevOpen, autoOkTimer]);

  useEffect(() => {
    //if end of timeout
    if (actualTimer === 0 && prevActualTimer === 1 && open) {
      closeOnOK && onClose && onClose();
      onOk && onOk()
    }
  }, [open, actualTimer, prevActualTimer, onOk, onClose, closeOnOK]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {redText ? <DialogContentText style={{ color: "#d93a3d" }} id="alert-dialog-description">
          {text}
        </DialogContentText> :
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="default">
          {cancelButtonTitle || "Cancel"}
        </Button>
        {moreButtons}
        <Button onClick={() => {
          closeOnOK && onClose();
          onOk()
        }} color="primary" autoFocus>
          {okButtonTitle || "Ok"}
          {actualTimer && autoOkTimer ? " (" + actualTimer + ")" : ""}
        </Button>
      </DialogActions>
    </Dialog>
  );

}