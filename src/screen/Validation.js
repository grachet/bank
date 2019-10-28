import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ValidationForm from "../components/ValidationForm";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
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
    maxWidth : 150,
    margin : 20
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

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleValidate = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Bankorama
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Validation
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
            <ValidationForm/> :
            <div>Our bankster should validate your account soon
              <div style={{textAlign:"center"}}>
              <img src={process.env.PUBLIC_URL + "/interview.svg"} className={classes.imgInterview} alt=""/>
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
                Validate
              </Button>}
          </div>
        </Paper>
      </main>
    </React.Fragment>
  );
}
