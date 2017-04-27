import React, { Component } from 'react';
import Client from '../Client.js';
import FileInput from 'react-file-input';
const FileInputX = require('react-file-input');
const moment = require('moment');

export default class Post extends Component {
	handleSubmit(e){
		e.preventDefault();
		const data = new FormData(e.target);
				for (var pair of data.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}
Client.post(data);
	}

	render(){
		return (
			<div>
			<form onSubmit={this.handleSubmit}>
			<input name="title" placeholder="Title"/>
			<input name="description" placeholder="Description"/>
			<FileInput />
			<input type="submit" value="Submit"/>
			</form>
			</div>
			);
	}
}		