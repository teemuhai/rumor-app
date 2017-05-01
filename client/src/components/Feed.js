import React, { Component } from 'react';
import Client from '../Client.js';
import { Container, Row, Col } from 'reactstrap';
import Card from './Card';
import Post from './Post';
import * as PostActions from '../PostActions';

export default class Feed extends Component {
	constructor(){
		super();
		this.getPosts = this.getPosts.bind(this);
		PostActions.getPosts();
		this.state = {
			posts: Client.getAll()
		};
	}
	componentWillMount(){
		Client.on('change', this.getPosts);
	}

	getPosts(){
		this.setState({
			posts: Client.getAll()
		});
	}

	createPost(){
		PostActions.createPost('this is a new post!');
	}

	componentWillUnmount(){
		Client.unbindListener('change', this.getPosts);
	}
	render(){
		console.log(this.state.posts);
		const Cards = this.state.posts.map((post, i) => {
			return <Card key={i} image={post.image} title={post.title} text={post.description} time={post.time} by={post.userId}/>
		});
		console.log('rendering feed here');
		return (
			<Container>
			<Post />
			{Cards}
			</Container>
			);
	}
}		