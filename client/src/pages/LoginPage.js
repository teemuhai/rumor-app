import React, { Component } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import {Row, Col} from 'reactstrap';


export default class LoginPage extends Component {
	constructor(){
		super();
	}

	render(){
		return(
			<div>
			<Row>
			<Col></Col>
         	<Col><Login/></Col>
          	<Col><Register/></Col>
          	<Col></Col>
        	</Row>
			</div>
			);
	}
}