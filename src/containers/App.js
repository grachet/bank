import React, {Component} from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../screens/Home'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {fetchAccount} from "../redux/actions/account";
import {bindActionCreators} from "redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import {color} from '../data/color'
import requireAuth from "../containers/requireAuth";
import SignIn from "../containers/SignIn"

class App extends Component {


  componentWillMount() {
    this.props.fetchAccount();
  }

  render() {

    const darkTheme = createMuiTheme({
      palette: {
        type: 'dark',
        primary: {
          main: color.containerBackground,
        },
        secondary: {
          main: color.accent,
        },
      },
    });

    const lightTheme = createMuiTheme({
      palette: {
        type: "light",
        primary: {
          main: color.containerBackground,
        },
        secondary: {
          main: color.accent,
        },

      },
    });


    return (
      <MuiThemeProvider theme={this.props.user && this.props.user.darkTheme ? darkTheme : lightTheme}>
        <CssBaseline/>
        <Router basename={`${process.env.PUBLIC_URL}/`}>
          <Switch>
            <Route exact path="/" component={requireAuth(Home)}/>
            <Route path="/auth" component={SignIn}/>
            <Route component={requireAuth(Home)}/>
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({account}) => {
  return {
    account
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAccount
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);

