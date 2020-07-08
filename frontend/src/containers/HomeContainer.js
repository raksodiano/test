import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "@material-ui/core";
import styled from "styled-components";
import Header from "../components/Header";
import { signOff } from "../actions";

class HomeContainer extends Component {

  render() {
    return (
      <Container>
        <Header user={this.props.user.session.payload.username} signOff={this.props.signOff} />
        <Card className="CardContainer">
					HOME
        </Card>
      </Container>
    );
  }
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .CardContainer {
    width: 50%;
    min-height: 50vh;
    display: flex;
    flex-direction: column;
  }
`;

const mapStateToProps = state => ({
  user: state,
});

export default connect(
  mapStateToProps,
  { signOff }
)(HomeContainer);