import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LightIcon from '@material-ui/icons/Opacity';
import AccountCircle from '@material-ui/icons/AccountCircle';

import SettingsIcon from '@material-ui/icons/Settings';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import {signOut, toggleTheme} from "../redux/actions/user"
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";


const styles = {
  grow: {
    flexGrow: 1,
  },
  logo: {
    height: 60
  },
  title: {
    textDecoration: 'none',
    flexGrow: 1,
  }
};

class MenuAppBar extends React.Component {

  render() {
    const {classes, user} = this.props;

    return (

      <AppBar position="fixed">
        <Toolbar>
          <Typography to={"/"}
                      component={Link} variant="title" color="inherit" className={classes.title}>
            G. Rachet
          </Typography>

          <Typography variant="title" color="inherit" className={classes.title}>
            {this.props.title}
          </Typography>


          <Typography variant="subheading" color="inherit">
            {user.isAnonymous ? "Anonymous" : user.displayName}
          </Typography>

          <IconButton
            color="inherit"
            onClick={() => this.props.signOut()}
          >
            <AccountCircle/>
          </IconButton>
          <IconButton
            to={"/setting"}
            component={Link}
            color="inherit"
          >
            <SettingsIcon/>
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => this.props.toggleTheme()}
          >
            <LightIcon/>
          </IconButton>

        </Toolbar>
      </AppBar>

    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({user, projects}) => {
  return {
    user,
    projects: projects
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleTheme, signOut
}, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MenuAppBar));
