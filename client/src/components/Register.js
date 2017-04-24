import React, { Component } from 'react';
import Client from '../Client.js'

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
			<form id="registerForm" onSubmit={this.handleSubmit}>
			<h3>Register</h3>
			<div className="form-group">
			<input type="text" name="username" id="username" placeholder="Username"/>
			</div>
			<div className="form-group">
			<input type="password" name="password" id="password" placeholder="Password"/>
			</div>
			<div className="form-group">
			<input type="e-mail" name="email" id="email" placeholder="E-mail"/>
			</div>
			<input type="submit" value="Submit"/>
			</form>
			</div>
			);
	}
}		