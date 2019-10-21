import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import blue from '@material-ui/core/colors/blue';
import PromptDialogue from '../components/PromptDialogue'
import AlertDialogue from '../components/AlertDialogue'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

var uniqid = require('uniqid');
var _ = require('lodash');

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class SimpleDialog extends React.Component {

  state = {
    openAddContact: false,
    openAlertRemove: false,
  }

  onClickUser = (uid, name) => {
    this.setState({openAlertRemove: true, userIdToRemove: uid, userNameToRemove: name})
  };

  onCloseRemove = () => {
    this.setState({openAlertRemove: false})
  };

  onOKRemove = () => {
    this.setState({openAlertRemove: false})
    let newProject = {...this.props.project}
    delete newProject["users"][this.state.userIdToRemove];
    this.props.updateProject(newProject)
  };

  closeAddUser = () => {
    this.setState({openAddContact: false})
    this.props.openUsersModal(null)
  };


  onOkAddUser = (data) => {
    const {name} = this.props.users[data.uid]
    let user = {
      ...data,
      name
    }
    this.setState({openAddContact: false});
    this.props.updateProject({...this.props.project, users: {...this.props.project.users, [data.uid]: user}})
    this.props.openUsersModal(null)
  };

  onAddUser = () => {
    this.setState({openAddContact: true})
    this.props.closeUsersModal()
  };


  render() {
    const {classes, closeUsersModal, project, users} = this.props;
    let usersId = [], names = [];
    if (users) {
      usersId = Object.keys(users);
      _.remove(usersId,(id) => project && project.users &&  Object.keys(project.users).includes(id));
      for (let o of usersId) {
        names.push(users[o].name);
      }
    }

    return (
      [<Dialog key={1} onClose={closeUsersModal}
               aria-labelledby="simple-dialog-title"
               open={this.props.open}>
        <DialogTitle id="simple-dialog-title">Users on project {project && project.projectName}</DialogTitle>
        <div>
          <List>
            {project && _.values(project.users).map(user => (
              <ListItem button onClick={() => this.onClickUser(user.uid, user.name)} key={user.name}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.uid === project.owner ? user.name + " (you)" : user.name}
                              secondary={user.role}/>
              </ListItem>
            ))}
            <ListItem button onClick={() => this.onAddUser()}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="add account"/>
            </ListItem>
          </List>
        </div>
      </Dialog>,
        <PromptDialogue
          key={2}
          open={this.state.openAddContact}
          onCancel={this.closeAddUser}
          onOk={this.onOkAddUser}
          title={"Add user on project " + (project && project.projectName)}
          selectfield={[{
            title: "User", name: "uid",
            titleValues: names, values: usersId
          },
            {title: "Role", name: "role", values: ["Developer", "Project Manager", "Designer"]}]}
        />,
        <AlertDialogue
          key={3}
          open={this.state.openAlertRemove}
          title={"Remove « " + (this.state.userNameToRemove) + " » from this project ?"}
          onClose={this.onCloseRemove}
          onOk={this.onOKRemove}
        />
      ]
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default withStyles(styles)(SimpleDialog);
