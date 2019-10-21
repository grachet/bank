import React, {Component} from "react";
import {connect} from "react-redux";
import {signIn} from "../redux/actions/user";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import {FaFacebookF as FacebookIcon, FaGithub as GitHubIcon, FaGoogle as GoogleIcon} from "react-icons/fa";
import {withStyles} from "@material-ui/core";
import styles from "./styles/loginStyle";
import Button from "@material-ui/core/Button/Button";
import AccountCircle from '@material-ui/icons/AccountCircle';


class Signin extends Component {

  componentWillUpdate(nextProps) {
    if (nextProps.user && nextProps.user !== "notConnected") {
      this.props.history.push('/')
    }
  }

  /*
       provider='linkedin'
       appId='86sph2qy1tud5w'

      provider='google'
      appId='503226279920-oj6fvc708ggp8njov9fhksn20l4ham6q.apps.googleusercontent.com'

     provider='facebook'
     appId='1196303573854713'
   */

  render() {

    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paperContainer} elevation={2}>
          <Typography variant="display1" className={classes.loginTitle} color="textPrimary">React Projects
            Boilerplate</Typography>
          <Typography variant="subheading" className={classes.loginSubtitle} color="textPrimary">By Guillaume
            Rachet</Typography>

          <Button onClick={() => this.props.signIn("facebook")} variant="contained"
                  className={classes.buttonLoginFacebook}
                  color="primary">
            <FacebookIcon className={classes.icon}/> Facebook
          </Button>

          <Button onClick={() => this.props.signIn("google")} variant="contained" className={classes.buttonLoginGoogle}
                  color="primary">
            <GoogleIcon className={classes.icon}/> Google
          </Button>

          <Button onClick={() => this.props.signIn("github")} variant="contained" className={classes.buttonLoginGitHub}
                  color="primary">
            <GitHubIcon className={classes.icon}/> GitHub
          </Button>

          <Button onClick={() => this.props.signIn("anonymous")} variant="contained"
                  className={classes.buttonLoginAnonymous}
                  color="secondary">
            <AccountCircle className={classes.icon}/> Anonymous
          </Button>

        </Paper>
      </div>
    );
  }
}

function mapStateToProps({user}) {
  return {user};
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, {signIn})(Signin));
