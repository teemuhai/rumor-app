import React, { Component } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import * as UserActions from '../actions/UserActions';
import {Row, Col, Container, Button} from 'reactstrap';
import Client from '../Client';


export default class LoginPage extends Component {
	constructor(){
		super();
		this.getAuth = this.getAuth.bind(this);
		this.state = ({
			auth: Client.getAuth(),
			user: Client.getUser().username
		});
	}
	componentWillMount(){
		Client.on('change', this.getAuth);
	}
	componentWillUnmount(){
		Client.removeListener('change', this.getAuth);
	}

	getAuth(){
		this.setState({
			auth: Client.getAuth(),
			user: Client.getUser().username
		});
	}

	logout(){
		UserActions.logout();
	}

	render(){
		if(this.state.auth === true){
			return(
				<div>
				<Container>
				<Row>
				<Col xs="6" sm="4"></Col>
				<Col xs="6" sm="4"><h3>You are now logged in as {this.state.user}!</h3></Col>
				<Col sm="4"></Col>
				</Row>
				<Row>
				<Col xs="6" sm="4"></Col>
				<Col xs="6" sm="4"><Button onClick={this.logout.bind(this)}>Logout</Button></Col>
				<Col sm="4"></Col>
				</Row>
				</Container>
				</div>
				);
		}
		else {
			return(
			<div>
			<Container>
			<Row>
			<Col></Col>
         	<Col><Login/></Col>
          	<Col><Register/></Col>
          	<Col></Col>
        	</Row>
        	</Container>
			</div>
			);
		}
	}
}