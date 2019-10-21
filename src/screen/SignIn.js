import React, {Component} from "react";
import {connect} from "react-redux";
import {signIn} from "../redux/actions/account";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import {withStyles} from "@material-ui/core";
import styles from "./styles/loginStyle";


class Signin extends Component {

  state = {
    signIn : false
  };

  componentWillUpdate(nextProps) {
    if (nextProps.user && nextProps.user !== "notConnected") {
      this.props.history.push('/')
    }
  }


  render() {

    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paperContainer} elevation={2}>
          <Typography variant="display1" className={classes.loginTitle} color="textPrimary">React Projects
            Boilerplate</Typography>




{/*
          <Button onClick={() => this.props.signIn("github")} variant="contained" className={classes.buttonLoginGitHub}
                  color="primary">
            <GitHubIcon className={classes.icon}/> GitHub
          </Button>

          <Button onClick={() => this.props.signIn("anonymous")} variant="contained"
                  className={classes.buttonLoginAnonymous}
                  color="secondary">
            <AccountCircle className={classes.icon}/> Anonymous
          </Button>
*/}

        </Paper>
      </div>
    );
  }
}

function mapStateToProps({user}) {
  return {user};
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, {signIn})(Signin));
