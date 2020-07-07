import React, { Component } from 'react';
import ComponentFrame from '../components/ComponentFrame';

class RegisterContainer extends Component {

	render() {
		return (
			<div>
        <ComponentFrame 
          header="Registro de Cliente"
          body={
            <div>
              Esta es la pantalla de inicio
            </div>
          }
        />
      </div>
		);
	}
}

export default RegisterContainer;