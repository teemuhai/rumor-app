import React, { Component } from 'react';
import Client from '../Client.js';
import Comment from './Comment';
import '../App.css';
import * as PostActions from '../actions/PostActions';
import { Card, CardImg, CardText, CardBlock, CardLink,
  CardTitle, CardSubtitle, Button, Row, Col, CardFooter, CardImgOverlay, Input, Tooltip } from 'reactstrap';
export default class PostCard extends Component {
	constructor(props){
		super();
		this.toggle = this.toggle.bind(this);
		this.state = {
			comment: '',
			id: props.id,
			user: Client.getUser().username,
			auth: Client.getAuth(),
			tooltipOpen: false
		}
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
      tooltipOpen: !this.state.tooltipOpen
    });
  }

	handleChange(e){
		this.setState({
			comment: e.target.value
		});
	}

	render(){
		const Comments = this.props.comments.map((comment, i) => {
			return <Comment key={i} comment={comment.comment} user={comment.user} />;
		});

		if(this.state.auth == true){
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
			</CardBlock>
			<CardFooter>{this.props.time} By {this.props.by}</CardFooter>
			</Card>
			</Col>
			<Col xs="6">
			<Card>
			<CardTitle>Comments:</CardTitle>
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
		else {
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
			</CardBlock>
			<CardFooter>{this.props.time} By {this.props.by}</CardFooter>
			</Card>
			</Col>
			<Col xs="6">
			<Card>
			<CardTitle>Comments:</CardTitle>
			<CardText className="text-left">{Comments}</CardText>
			<div className="input-group">
			<Input type="text" onChange={this.handleChange.bind(this)} id="commentInput" />
			<div>
			<Button id="TooltipBtn" className="disabled">Comment</Button>
			<Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target="TooltipBtn" toggle={this.toggle}>
          	You have to login before you can comment on posts!
        	</Tooltip>
			</div>
			</div>
			</Card>
			</Col>
			</Row>
			</div>
			);
		}
	}
}		