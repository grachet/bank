import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {makeStyles,Link} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  dropZone: {
    backgroundColor: "rgb(235,235,235)",
    padding: 20,
    borderRadius: 10
  },
}));

export default function Dropzone({onDropFile, file}) {

  const classes = useStyles();
  const onDrop = useCallback(acceptedFiles => {
    onDropFile(acceptedFiles[0]);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
[    <div className={classes.dropZone} {...getRootProps()}>
      <input {...getInputProps()} multiple={false} accept="application/pdf"/>
      {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag and drop some files here, or click to select files</p>
      }

    </div>, file && <Link href={file} target={"_blank"}>{file.name}</Link>]
  )
}
