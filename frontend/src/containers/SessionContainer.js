import React, { Component } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { login, register } from "../actions";
import { connect } from "react-redux";

class SessionContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
    };
  }

  singUp = () => {
    this.setState({ step: 2 });
  };

  singIn = () => {
    this.setState({ step: 1 });
  };

  onLogin = (values, { resetForm }) => {
    this.props.login({
      username: values.email,
      password: values.phone,
    });
  };

  onRegister = (values) => {
    this.props.register(values, () => {
      this.setState({ step: 1 });
    });
  };

  render() {
    return (
      <div>
        {this.state.step === 1 && (
          <Login onLogin={this.onLogin} singUp={this.singUp} />
        )}
        {this.state.step === 2 && (
          <Register onRegister={this.onRegister} singIn={this.singIn} />
        )}
      </div>
    );
  }
}

export default connect(null, { login, register })(SessionContainer);