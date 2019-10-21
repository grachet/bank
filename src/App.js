import React, {useState} from 'react';
import './App.css';
import SignIn from "./screen/SignIn"
import SignUp from "./screen/SignUp"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Validation from "./screen/Validation";
import Account from "./screen/Account";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import requireAuth from "./functions/requireAuth";

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

  return (
    <ThemeProvider theme={mainTheme}>

      {JSON.stringify(account)}
      <Router>
        <Switch>
          <Route path="/signin">
            <SignIn onSign={setAccount}/>
          </Route>
          <Route path="/signup">
            <SignUp onSign={setAccount}/>
          </Route>
          <Route path="/account">
            {requireAuth(
              account ? <Account/> :
                <Validation/>
            )}
          </Route>
          <Route path="/">
            {requireAuth(
              account ? <Account/> :
                <Validation/>
            )}
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
