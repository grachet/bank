import React, {useState} from 'react';
import './App.css';
import SignIn from "./screen/SignIn"
import SignUp from "./screen/SignUp"
import {BrowserRouter as Router, Route, Switch,useHistory,Redirect} from "react-router-dom";
import Validation from "./screen/Validation";
import Account from "./screen/Account";
import BankManager from "./screen/BankManager";

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

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
  const [account, setAccount] = useState("iji");
  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <Switch>
          <Route path="/signin">
            <SignIn onSign={setAccount}/>
          </Route>
          <Route path="/signup">
            <SignUp account={account} onSign={setAccount}/>
          </Route>
          <PrivateRoute path="/" account={account}>
            {
              account && account.role === "banker" ? <BankManager/> : account && account.role === "verified_account" ? <Account/> : <Validation/>
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
