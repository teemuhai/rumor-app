import React, { Component } from 'react';
import Client from '../Client.js';
import FileInput from 'react-file-input';
import * as PostActions from '../actions/PostActions';
import { Form, FormGroup, Input, Row, Col, Button } from 'reactstrap';
const moment = require('moment');

export default class Post extends Component {
	constructor(){
		super()
	}

	handleSubmit(e){
		e.preventDefault();
		const data = new FormData(e.target);
		for (var pair of data.entries()) {
 			console.log(pair[0]+ ', ' + pair[1]); 
		} 
		const time = moment().format('MMMM Do YYYY, h:mm a');
		data.append('time', time);
		data.append('user', Client.getUser());
		PostActions.createPost(data);
	}

	render(){
		return (
			<div>
			<Row>
			<Col sm="12" md={{ size: 8, offset: 2 }}>
			<Form onSubmit={this.handleSubmit}>
			<FormGroup>
				<Input name="title" placeholder="Title"/>
			</FormGroup>
			<FormGroup>
				<Input name="description" type="textarea" placeholder="Description"/>
			</FormGroup>
			<FormGroup>
				<FileInput placeholder="Add Image..." />
			</FormGroup>
			<FormGroup>
				<Button type="submit" color="primary">Submit</Button>
			</FormGroup>
			</Form>
			</Col>
			</Row>
			</div>
			);
	}
}		