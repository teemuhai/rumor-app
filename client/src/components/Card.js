import React, { Component } from 'react';
import Client from '../Client.js';
import * as PostActions from '../actions/PostActions';
import { Card, CardImg, CardText, CardBlock, CardLink,
  CardTitle, CardSubtitle, Button, Row, Col, CardFooter, CardImgOverlay, Input } from 'reactstrap';
export default class PostCard extends Component {
	constructor(props){
		super()
		this.state = {
			comment: '',
			id: props.id,
			user: Client.getUser().username
		}
		console.log(this.props);
	}

	onBtnClick(){
		console.log(this.state.comment);
		console.log(this.state.id);
		const data = this.state;

		//show the post only with comments
		PostActions.commentPost(data);

	}

	handleChange(e){
		console.log(e.target.value);
		this.setState({
			comment: e.target.value
		});
	}

	render(){
		return (
			<div>
			<Row>
			<Col xs="6">
			<Card>
			<CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
			<CardImgOverlay>
			<CardTitle className="text-left">{this.props.title}</CardTitle>
			</CardImgOverlay>
			<CardBlock>
			<CardText className="text-left">{this.props.text}</CardText>
			</CardBlock>
			<CardFooter>{this.props.time} By {this.props.by}</CardFooter>
			</Card>
			</Col>
			<Col xs="6">
			<Card>
			<CardTitle>Comments here</CardTitle>
			<CardText>{this.props.comments}</CardText>
			<div className="input-group">
			<Input type="text" onChange={this.handleChange.bind(this)} id="commentInput" />
			<div>
			<Button onClick={this.onBtnClick.bind(this)}>Comment</Button>
			</div>
			</div>
			</Card>
			</Col>
			</Row>
			</div>
			);
	}
}		