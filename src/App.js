import React, { useState, useEffect } from 'react';
import './App.css';
import SignIn from "./screen/SignIn"
import SignUp from "./screen/SignUp"
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Validation from "./screen/Validation";
import Account from "./screen/Account";
import BankManager from "./screen/BankManager";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { listenAccount } from "./functions/firebaseFuntion";
import { fetchUser } from './functions/authFunctions';

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
    fetchUser((uid) => {
      listenAccount(uid, setAccount)
      if (!uid) {
        removeLoader()
      } else {
        setTimeout(() => {
          removeLoader();
        }, 500)
      }
    })
  }, [])

  return (
    <ThemeProvider theme={mainTheme}>
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
