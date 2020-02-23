import React, { useState, useEffect } from 'react';
import './App.css';
import SignIn from "./screen/SignIn"
import SignUp from "./screen/SignUp"
import CloseIcon from '@material-ui/icons/Close';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Validation from "./screen/Validation";
import Account from "./screen/Account";
import BankManager from "./screen/BankManager";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { listenAccount } from "./functions/firebaseFuntion";
import { fetchUser } from './functions/authFunctions';
import { SnackbarProvider } from 'notistack';
import { IconButton } from '@material-ui/core';

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#202020"
    },
    secondary: {
      main: "#3BD0D6"
    },
  },
});

function App() {
  const [account, setAccount] = useState(null);

  const notistackRef = React.createRef();


  let onSign = (uid) => {
    listenAccount(uid, setAccount)
  };

  let removeLoader = () => {
    const ele = document.getElementById('loaderContainer');
    if (ele) {
      // fade out
      ele.classList.add('available');
      setTimeout(() => {
        // remove from DOM
        ele.outerHTML = ''
      }, 2000)
    }
  }

  useEffect(() => {
    fetchUser((user) => {
      if (!user) {
        removeLoader()
      } else {
        listenAccount(user.uid, setAccount)
        // notistackRef.current.enqueueSnackbar("Reconnected as " + user.email, {
        //   variant: "success",
        // })
        setTimeout(() => {
          removeLoader();
        }, 1000)
      }
    })
  }, [])

  return (
    <ThemeProvider theme={mainTheme}>
      <SnackbarProvider maxSnack={4} dense
        ref={notistackRef}
        action={(key) => (
          <IconButton key={2} size="small" color={"inherit"} onClick={() => notistackRef.current.closeSnackbar(key)}><CloseIcon /></IconButton>
        )}
      >
        <Router>
          <Switch>
            <Route path="/signin">
              <SignIn account={account} onSign={onSign} />
            </Route>
            <Route path="/signup">
              <SignUp account={account} onSign={onSign} />
            </Route>
            <PrivateRoute path="/delete" account={account}>
              <Validation setAccount={setAccount} account={account} isRemoveAccount />
            </PrivateRoute>
            <PrivateRoute path="/" account={account}>
              {
                account && !account.isVerified ? <Validation setAccount={setAccount} account={account} /> : account && account.isBankManager ? <BankManager setAccount={setAccount} account={account} /> :
                  <Account setAccount={setAccount} account={account} />
              }
            </PrivateRoute>
          </Switch>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

function PrivateRoute({ children, account, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        account ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

export default App;
