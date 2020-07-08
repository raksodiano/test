import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
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
    console.log("app", this.props);
    
    return (
      <Container>
        {!this.props.user.payload.logout && <SessionContainer />}
        {this.props.user.payload.logout && <HomeContainer />}
      </Container>
    );
  }
}

const Container = styled.div`
  min-height: 98vh;
  display: flex;
  flex-direction: column;
  background: aliceblue;
`;

const mapStateToProps = (state) => ({
  user: { ...state.session },
});

export default connect(mapStateToProps, null)(App);
