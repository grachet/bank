import React, {Component} from 'react';
import Navigation from '../containers/Navigation'
import styles from './styles/homeStyle'
import {withStyles} from '@material-ui/core/styles';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from 'redux';

var _ = require('lodash');
var uniqid = require('uniqid');
var moment = require('moment');

class Home extends Component {

  state = {
    openCreateProject: false,
    openUsersModal: false,
  };

  openUsersModal = (projectId) => {
    this.setState({openUsersModal: true});
    if (projectId) {
      this.projectId = projectId;
    }
  };

  closeUsersModal = () => {
    this.setState({openUsersModal: false});
  };

  openCreateProject = () => {
    this.setState({openCreateProject: true});
  };

  closeCreateProject = () => {
    this.setState({openCreateProject: false});
  };

  onValidateCreateProject = (project) => {
    //todo
    const {uid, email, displayName} = this.props.account;
    let id = uniqid()
    this.props.updateProject({
      ...project,
      projectId: id,
      creationTimestamp: moment().format(),
      owner: uid,
      users: {
        [uid]: {
          "role": "Project Manager",
          uid,
          name: email || displayName,
        }
      }
    });
    this.setState({openCreateProject: false});
  }

  render() {
    const {classes, projects} = this.props;
    return (
      <div className={classes.container}>
        <Navigation/>
      </div>
    );
  }
}


const mapStateToProps = ({user}) => {
  return {
    user
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Home));

