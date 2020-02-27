import React, { useRef } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import FormikFormGenerator from "./fields/FormikFormGenerator";

export default function PromptDialogue({ fields, onOk, disableCancelOnOK, defaultValue, okText, title, maxWidth, open, component, onCancel, link, text }) {

  const formRef = useRef(null);

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth={maxWidth || "sm"}
        open={open}
        onClose={onCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {text}
          </DialogContentText>
          {link &&
            <Button href={link.url} target="_blank" color="primary" size={"small"} variant={"outlined"}>{link.name}</Button>
          }
          {component}
          <FormikFormGenerator
            onSubmit={(values) => {
              !disableCancelOnOK && onCancel();
              onOk(values);
            }}
            fields={fields}
            formRef={formRef}
            data={defaultValue}
            isDialogue
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
            </Button>
          <Button onClick={() => formRef.current && formRef.current.submitForm()} color="primary">
            {okText || "Ok"}
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}


