import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  dropZone: {
    backgroundColor: "rgb(235,235,235)",
    padding: 20,
    borderRadius: 10
  },
}));

function MyDropzone() {

  const classes = useStyles();

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className={classes.dropZone} {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag and drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default function ValidationForm({isBankManager, setIsBankManager, setIdCard, idCard}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Id Card
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MyDropzone/>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary"
                        checked={isBankManager}
                        onChange={(e) => setIsBankManager(e.target.checked)}
              />}
            label="I want a bankster account"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
