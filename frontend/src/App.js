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
        {console.log(this.props.user)}
        {!this.props.user.logout && <SessionContainer />}
        {this.props.user.logout && <HomeContainer />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: { logout: state.session.logout },
});

export default connect(mapStateToProps, null)(App);
