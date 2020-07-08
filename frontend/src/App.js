import React, { Component } from "react";
// import Snackbars from './components/Snackbars';
import { connect } from "react-redux";
import HomeContainer from "./containers/HomeContainer";
import SessionContainer from "./containers/SessionContainer";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logout: false,
    };
  }

  render() {
    return (
      <div>
        {!this.props.user.email && <SessionContainer />}
        {this.props.user.email && <HomeContainer />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state,
});

export default connect(mapStateToProps, null)(App);
