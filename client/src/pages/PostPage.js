import React, { Component } from 'react';
import {Row, Col, Container} from 'reactstrap';
import Post from '../components/Post';

export default class LoginPage extends Component {
	constructor(){
		super();
	}

	render(){
		return(
			<div>
			<Container>
			<Row>
			<Col sm={{ size: 6, push: 2, pull: 2, offset: 1 }}>
			<h3>Create a post here!</h3>
			<Post/>
			</Col>
        	</Row>
        	</Container>
			</div>
			);
	}
}