import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ValidationForm from "../components/validation/ValidationForm";
import NavigationBar from "../components/NavigationBar";
import {writeAccount} from "../functions/firebaseFuntion";
import {getIdCard, getIdCardUrl, putIdCard} from "../functions/fileFunctions";
import {Link} from "@material-ui/core";

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

export default function Validation({account,setAccount}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(account.idCard ? 1 : 0);
  const [isBankManager, setIsBankManager] = React.useState(account.isBankManager);
  const [idCard, setIdCard] = React.useState(null);

  useEffect(() => {
    getIdCard(account.id, setIdCard)
  }, []);

  const handleValidate = () => {
    setActiveStep(activeStep + 1);
    putIdCard(idCard, account.id + ".pdf");
    writeAccount({...account, isBankManager : !isBankManager}, account.id)
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <NavigationBar account={account} setAccount={setAccount}/>
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
            <ValidationForm isBankManager={isBankManager} setIsBankManager={setIsBankManager} setIdCard={setIdCard}
                            idCard={idCard}/> :
            <div>Our bankster should validate your account soon <br/><br/>
              {idCard && <Link href={window.URL.createObjectURL(idCard)} download={"idCard.pdf"} target={"_blank"}>{idCard.name}</Link>}
              <div style={{textAlign: "center"}}>
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
                Upload
              </Button>}
          </div>
        </Paper>
      </main>
    </React.Fragment>
  );
}
