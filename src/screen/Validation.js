import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ValidationForm from "../components/validation/ValidationForm";
import NavigationBar from "../components/NavigationBar";
import { writeAccount } from "../functions/firebaseFuntion";
import { putSignature, putIdCard, getFile } from "../functions/fileFunctions";
import { Link } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  imgInterview: {
    width: "80%",
    maxWidth: 150,
    margin: 20
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function Validation({ account, setAccount, isRemoveAccount }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isBankManager, setIsBankManager] = React.useState(account.isBankManager);
  const [file, setFile] = React.useState(null);


  useEffect(() => {
    setFile(null)
    setActiveStep(0)
    getFile((isRemoveAccount ? "signature/" : "idCard/") + account.id + ".pdf").then(file => {
      setFile(file)
      file && setActiveStep(1)
    })
  }, [account.id, isRemoveAccount]);

  const handleValidate = () => {
    setActiveStep(activeStep + 1);
    if (isRemoveAccount) {
      putSignature(file, account.id + ".pdf");
      writeAccount({ ...account, toRemove: true }, account.id)
    } else {
      putIdCard(file, account.id + ".pdf");
      writeAccount({ ...account, isBankManager }, account.id)
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <NavigationBar account={account} setAccount={setAccount} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            {isRemoveAccount ? "Remove account" : "Validation"}
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            <Step key={"Send documents"}>
              <StepLabel>{"Send documents"}</StepLabel>
            </Step>
            <Step key={"Wait for our manual validation"}>
              <StepLabel>{"Wait for our manual validation"}</StepLabel>
            </Step>
          </Stepper>
          {activeStep === 0 ?
            <ValidationForm isRemoveAccount={isRemoveAccount} isBankManager={isBankManager} setIsBankManager={setIsBankManager} setFile={setFile}
              file={file} /> :
            <div>Our bank manager should {isRemoveAccount ? "remove" : "validate"} your account soon <br /><br />
              {file && <Link href={window.URL.createObjectURL(file)} download={file.name} target={"_blank"}>{file.name}</Link>}
              <div style={{ textAlign: "center" }}>
                <img src={process.env.PUBLIC_URL + "/interview.svg"} className={classes.imgInterview} alt="" />
              </div>
            </div>
          }
          <div className={classes.buttons}>
            {activeStep === 1 ?
              <Button onClick={handleBack} size={"small"} className={classes.button}>
                Change document
              </Button> :
              <Button
                size={"small"}
                variant="contained"
                color="primary"
                onClick={handleValidate}
                className={classes.button}
              >
                Upload
              </Button>}
          </div>
        </Paper>
      </main>
    </React.Fragment>
  );
}
