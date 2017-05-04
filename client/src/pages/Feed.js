import React, { Component } from 'react';
import Client from '../Client.js';
import { Container, Row, Col } from 'reactstrap';
import Card from '../components/Card';
import Post from '../components/Post';
import * as PostActions from '../actions/PostActions';

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

	componentWillUnmount(){
		Client.removeListener('change', this.getPosts);
	}

	render(){
		console.log(this.state.posts);
		const Cards = this.state.posts.map((post, i) => {
			return <Card  comments={post.comments} id={post._id} key={i} image={post.image} title={post.title} text={post.description} 
			time={post.time} by={post.user}/>
		});
		console.log('rendering feed here');
		return (
			<Container>
			{Cards}
			</Container>
			);
	}
}		