import React from 'react';
import './App.css';
import SignIn from "./screen/SignIn"
import SignUp from "./screen/SignUp"
import {Route, Switch,BrowserRouter as Router} from "react-router-dom";
import Validation from "./screen/Validation";
import Account from "./screen/Account";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const mainTheme = createMuiTheme({
  palette: {
    primary : {
      main : "#202020"
    },
    secondary: {
      main: "#3BD0D6"
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={mainTheme}>
    <Router>
      <Switch>
        <Route path="/signin">
          <SignIn/>
        </Route>
        <Route path="/signup">
          <SignUp/>
        </Route>
        <Route path="/">
          <SignIn />
        </Route>
        <Route path="/validation">
          <Validation />
        </Route>
        <Route path="/account">
          <Account />
        </Route>
      </Switch>
    </Router>
    </ThemeProvider>
  );
}

export default App;
