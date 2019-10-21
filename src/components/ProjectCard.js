import React, {Component} from 'react';
import styles from './styles/projectCardStyle'
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AlertDialogue from "./AlertDialogue";
import {Link} from "react-router-dom";

var moment = require('moment');

class ProjectCard extends Component {

  state = {
    anchorMenu: null,
    openAlertDeleteProject: false
  };

  handleClick = event => {
    this.setState({anchorMenu: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorMenu: null});
  };

  onCloseDeleteProject = () => {
    this.setState({openAlertDeleteProject: false})
  };

  onOpenDeleteProject = () => {
    this.setState({openAlertDeleteProject: true})
  };

  onOKDeleteProject = () => {
    this.setState({openAlertDeleteProject: false});
    this.props.removeProject(this.props.project.projectId)
  };


  render() {

    const {classes} = this.props;
    const {anchorMenu} = this.state;
    return (
      <Card>
        <CardActionArea to={"/project/" + this.props.project.projectId}
                        component={Link} className={classes.wmax}>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {this.props.project.projectName}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" onClick={() => this.props.openUsersModal(this.props.project.projectId)} color="primary">
            <span className={classes.mrs}>Share</span><AccountCircle/>
          </Button>
          <IconButton
            color={"primary"}
            aria-owns={anchorMenu ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MoreIcon/>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorMenu}
            open={Boolean(anchorMenu)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={() => {
              this.handleClose();
              this.onOpenDeleteProject()
            }}>Delete</MenuItem>
          </Menu>
          <Typography component="p">
            {moment(this.props.project.creationTimestamp).format("dddd, MMMM Do")}
          </Typography>
        </CardActions>
        <AlertDialogue
          open={this.state.openAlertDeleteProject}
          title={"Delete the project « " + (this.props.project.projectName) + " » ?"}
          onClose={this.onCloseDeleteProject}
          onOk={this.onOKDeleteProject}
        />
      </Card>
    );
  }
}

export default withStyles(styles, {withTheme: true})(ProjectCard);