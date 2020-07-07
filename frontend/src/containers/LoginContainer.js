import React, { Component } from "react";
import ComponentFrame from "../components/ComponentFrame";

class LoginContainer extends Component {

  render() {
    return (
      <div>
        <ComponentFrame
          header="Login"
          body={
            <div>
              Logear para ver tu wallet
            </div>
          }
        />
      </div>
    );
  }
}

export default LoginContainer;
