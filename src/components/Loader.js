import React, {Component} from "react";
import {PulseLoader} from 'halogenium';
import {color} from "../data/color";
import styles from "../containers/styles/loginStyle"
import {withStyles} from "@material-ui/core";

class Loader extends Component {


  render() {

    const {classes} = this.props;

    return <div className={classes.loaderContainer}>
      <PulseLoader color={color.background} size="40px" margin="4px" className={classes.loader}/>
    </div>
  }
}


export default withStyles(styles, {withTheme: true})(Loader);