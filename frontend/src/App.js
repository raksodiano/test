import React, { Component } from "react";
import { Paper, AppBar, Typography, Toolbar } from "@material-ui/core";
import { Grid, Row, Col } from "react-flexbox-grid";
import RegisterContainer from "./containers/RegisterContainer";
import LoginContainer from "./containers/LoginContainer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <AppBar position="sticky">
            <Toolbar>
              <Typography>Wallet ePayco</Typography>
            </Toolbar>
          </AppBar>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <Paper elevation={4}>
              <div className="Register">
                <RegisterContainer />
              </div>
            </Paper>
          </Col>
          <Col xs={12} md={6}>
            <Paper elevation={4}>
              <div className="details">
                <LoginContainer />
              </div>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
