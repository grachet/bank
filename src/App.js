import React, {useState} from 'react';
import './App.css';
import SignIn from "./screen/SignIn"
import SignUp from "./screen/SignUp"
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Validation from "./screen/Validation";
import Account from "./screen/Account";
import BankManager from "./screen/BankManager";
import RemoveAccount from "./screen/RemoveAccount";

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {listenAccount} from "./functions/firebaseFuntion";

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

  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <Switch>
          <Route path="/signin">
            <SignIn account={account} onSign={onSign}/>
          </Route>
          <Route path="/signup">
            <SignUp account={account} onSign={onSign}/>
          </Route>
          <Route path="/close">
            <RemoveAccount account={account}/>
          </Route>
          <PrivateRoute path="/" account={account}>
            {
              account && !account.isVerified ? <Validation account={account}/> : account && account.isBankManager ? <BankManager account={account}/> :
                <Account account={account}/>
            }
          </PrivateRoute>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

function PrivateRoute({children, account, ...rest}) {
  return (
    <Route
      {...rest}
      render={({location}) =>
        account ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: {from: location}
            }}
          />
        )
      }
    />
  );
}

export default App;
