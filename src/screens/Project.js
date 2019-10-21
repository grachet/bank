import React, {Component} from 'react';
import styles from './styles/travelStyle'
import {withStyles} from '@material-ui/core/styles';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from 'redux';

class Home extends Component {

  state = {};

  render() {
    const {id} = this.props.match.params;
    const {classes, projects} = this.props;
    let project = projects[id];

    return (
      <div className={classes.root}>
      </div>
    );
  }
}


const mapStateToProps = ({user, projects}) => {
  return {
    projects, currentUser: user
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Home));

