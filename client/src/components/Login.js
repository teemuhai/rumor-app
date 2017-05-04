import React, { Component } from 'react';
import Client from '../Client.js';
import * as UserActions from '../actions/UserActions';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Login extends Component {
	handleSubmit(e){
		e.preventDefault();
		console.log(e.target);
		const data = new FormData(e.target);
		for (var pair of data.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}
		UserActions.loginPost(data);
	}
	//onSubmit={this.handleSubmit}

	render(){
		return (
			<div>
			<Form id="loginForm" onSubmit={this.handleSubmit}>
			<h3>Login</h3>
			<FormGroup>
			<Input type="text" name="username" placeholder="Username"/>
			</FormGroup>
			<FormGroup>
			<Input type="password" name="password" placeholder="Password"/>
			</FormGroup>
			<FormGroup>
			<Button type="submit" value="Submit">Submit</Button>
			</FormGroup>
			</Form>
			</div>
			);
	}
}		