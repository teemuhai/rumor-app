import React, { Component } from 'react';
import Client from '../Client.js';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Register extends Component {
	handleSubmit(e){
		e.preventDefault();
		console.log(e.target);
		const data = new FormData(e.target);
		for (var pair of data.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}
		Client.register(data);
	}

	render(){
		return (
			<div>
			<Form id="registerForm" onSubmit={this.handleSubmit}>
			<h3>Register</h3>
			<FormGroup>
			<Input type="text" name="username" id="username" placeholder="Username"/>
			</FormGroup>
			<FormGroup>
			<Input type="password" name="password" id="password" placeholder="Password"/>
			</FormGroup>
			<FormGroup>
			<Input type="e-mail" name="email" id="email" placeholder="E-mail"/>
			</FormGroup>
			<FormGroup>
			<Button type="submit" value="Submit">Submit</Button>
			</FormGroup>
			</Form>
			</div>
			);
	}
}		