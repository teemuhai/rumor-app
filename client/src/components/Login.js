import React, { Component } from 'react';
import Client from '../Client.js';

export default class Login extends Component {
	handleSubmit(e){
		e.preventDefault();
		console.log(e.target);
		const data = new FormData(e.target);
		for (var pair of data.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}
		Client.login(data);
	}

	render(){
		return (
			<div>
			<form id="loginForm" onSubmit={this.handleSubmit}>
			<h3>Login</h3>
			<input type="text" name="username" placeholder="Username"/>
			<br/> 
			<input type="password" name="password" placeholder="Password"/>
			<br/>
			<br/>
			<input type="submit" value="Submit"/>
			</form>
			</div>
			);
	}
}		