import React from 'react';
import './App.css';
import SignIn from "./screen/SignIn"
import SignUp from "./screen/SignUp"
import {Route, Switch,BrowserRouter as Router} from "react-router-dom";
import Validation from "./screen/Validation";
import Account from "./screen/Account";

function App() {

  return (
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
  );
}

export default App;
