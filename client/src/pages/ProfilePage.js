import React, { Component } from 'react';
import Card from '../components/Card';
import Client from '../Client';
import * as UserActions from '../actions/UserActions';
import {Row, Col, Media, Button} from 'reactstrap';

export default class ProfilePage extends Component {
	constructor(){
		super();
		this.getUser = this.getUser.bind(this);
		this.getUserPosts = this.getUserPosts.bind(this);
		this.state = {
			user: Client.getUser(),
			userPosts : Client.getUserPosts()
		}
	}
	componentWillMount(){
		Client.on('change', this.getUser);
		Client.on('change', this.getUserPosts);
	}
	componentWillUnmount(){
		Client.removeListener('change', this.getUser);
		Client.removeListener('change', this.getUserPosts);
	}
	getUser(){
		this.setState({
			user: Client.getUser()
		});
	}
	getUserPosts(){
		this.setState({
			userPosts: Client.getUserPosts()
		});
	}
	onBtnClick(){
		UserActions.getUserPosts();
	}

	render(){

		return(
			<div>
			<Row>
			<Col>
			<Media body>
			<Media heading>
			Hello, {this.state.user.username}!
			</Media>
			Here are your posts:
			<Button onClick={this.onBtnClick}>Try the method</Button>
			</Media>
			</Col>
			TODO: 
			image uploading with multer working in server(see sssf-week2)
			User's own posts on profile page and delete functionality for them
			Commenting on feed page cards, includes patch requests and server update postCard object.
        	</Row>
			</div>
			);
	}
}