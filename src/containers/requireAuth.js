import React, {Component} from "react";
import {connect} from "react-redux";
import Loader from "../components/Loader";

export default function (ComposedComponent) {
  class Authentication extends Component {

    componentWillMount() {
      if (this.props.authenticated === "notConnected") {
        this.props.history.push("/auth")
      }
    }

    componentWillUpdate(nextProps) {
      if (this.props.authenticated === "notConnected" || nextProps.authenticated === "notConnected") {
        this.props.history.push("/auth")
      }
    }

    render() {
      if (this.props.authenticated && this.props.authenticated !== "notConnected") {
        return <ComposedComponent {...this.props} />;
      }
      return <Loader/>;
    }
  }

  function mapStateToProps(state) {
    return {authenticated: state.user};
  }

  return connect(mapStateToProps)(Authentication);
}