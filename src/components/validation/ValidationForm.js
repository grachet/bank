import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react'
import Dropzone from "../DropZone"


export default function ValidationForm({ isRemoveAccount, isBankManager, setIsBankManager, setIdCard, idCard }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {isRemoveAccount ? "Signature" : "Id Card"} (.pdf)
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Dropzone onDropFile={setIdCard} file={idCard} />
        </Grid>
        {!isRemoveAccount && <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary"
                checked={isBankManager}
                onChange={(e) => setIsBankManager(e.target.checked)}
              />}
            label="I want a bank manager account"
          />
        </Grid>}
      </Grid>
    </React.Fragment>
  );
}
