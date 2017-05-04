import React, { Component } from 'react';
import Client from '../Client.js';
import Comment from './Comment';
import * as PostActions from '../actions/PostActions';
import * as UserActions from '../actions/UserActions';
import { Card, CardImg, CardText, CardBlock, CardLink,
  CardTitle, CardSubtitle, Button, Row, Col, CardFooter, CardImgOverlay, Input, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
export default class PostCard extends Component {
	constructor(props){
		super();
		this.toggle = this.toggle.bind(this);
		this.state = {
			comment: '',
			id: props.id,
			user: Client.getUser().username,
			popoverOpen: false
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

	toggle() {
    	this.setState({
      	popoverOpen: !this.state.popoverOpen
    	});
  	}

	handleChange(e){
		console.log(e.target.value);
		this.setState({
			comment: e.target.value
		});
	}

	onDeleteClick(){
		const data = {
			id: this.state.id
		}
		UserActions.deletePost(data);
		this.toggle();
	}

	render(){

		const Comments = this.props.comments.map((comment, i) => {
			return <Comment key={i} comment={comment.comment} user={comment.user}/>
		});
		//onClick={this.onDeleteClick.bind(this)}
		return (
			<div>
			<br/>
			<Row>
			<Col xs="6">
			<Card>
			<CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
			<CardImgOverlay>
			<CardTitle className="text-left">{this.props.title}</CardTitle>
			</CardImgOverlay>
			<CardBlock>
			<CardText className="text-left">{this.props.text}</CardText>
			<div className="input-group">
			<Button id="Popover" onClick={this.toggle}>Delete</Button>
			</div>
			<Popover placement="right" isOpen={this.state.popoverOpen} target="Popover" toggle={this.toggle}>
          	<PopoverTitle>Delete post</PopoverTitle>
          	<PopoverContent className="text-center">
          	Are you sure you want to DELETE this post?
          	<br/>
          	<Button color="danger" size="sm" onClick={this.onDeleteClick.bind(this)}>Delete</Button>
          	<Button color="primary" size="sm" onClick={this.toggle}>Cancel</Button>
          	</PopoverContent>
        	</Popover>
			</CardBlock>
			<CardFooter>{this.props.time} By {this.props.by}</CardFooter>
			</Card>
			</Col>
			<Col xs="6">
			<Card>
			<CardTitle>Comments here</CardTitle>
			<CardText className="text-left">{Comments}</CardText>
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