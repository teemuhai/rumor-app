import React, { Component } from 'react';
import UserCard from '../components/UserCard';
import Client from '../Client';
import * as UserActions from '../actions/UserActions';
import {Row, Col, Media, Button, Container} from 'reactstrap';

export default class ProfilePage extends Component {
	constructor(){
		super();
		const data = {
			userId: Client.getUser()._id
		}
		UserActions.getUser();
		UserActions.getUserPosts(data);
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
		const data = {
			userId: Client.getUser()._id
		}
		UserActions.getUserPosts(data);
	}

	render(){
		const UserCards = this.state.userPosts.map((post, i) => {
			return <UserCard  comments={post.comments} id={post._id} key={i} image={post.image} title={post.title} text={post.description} 
			time={post.time} by={post.user}/>
		});

		return(
			<div>
			<Container>
			<Row>
			<Col>
			<Media body>
			<Media heading>
			Hello, {this.state.user.username}! 
			Here are your posts:
			</Media>
			{UserCards}
			</Media>
			</Col>
        	</Row>
        	</Container>
			</div>
			);
	}
}