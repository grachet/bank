import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BankIcon from '@material-ui/icons/AccountBalance';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Menu, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { signOut } from "../functions/authFunctions";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavigationBar({ account, position, setAccount }) {
  const classes = useStyles();
  let history = useHistory();
  const [openMenu, setOpenMenu] = useState(false);

  // <AppBar position="absolute" color="default" className={classes.appBar}>
  //         <Toolbar>
  //           <Typography variant="h6" color="inherit" noWrap>
  //             Bankorama
  //           </Typography>
  //         </Toolbar>
  //       </AppBar>

  return (
    <AppBar position={position || "static"}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <BankIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Bankorama
        </Typography>
        {account.isBankManager && <Typography variant="h6" className={classes.title}>
          Bank Manager
        </Typography>}
        <div>
          {account.firstName} {account.name}
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(e) => setOpenMenu(e.currentTarget)}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={openMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openMenu}
            onClose={() => setOpenMenu(false)}
          >
            <MenuItem onClick={() => history.push("/delete")}>Delete account</MenuItem>
            <MenuItem onClick={() => signOut(account.id, setAccount)}>Sign out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
