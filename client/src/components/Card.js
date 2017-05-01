import React, { Component } from 'react';
import Client from '../Client.js';
import { Card, CardImg, CardText, CardBlock, CardLink,
  CardTitle, CardSubtitle, Button, Row, Col, CardFooter, CardImgOverlay } from 'reactstrap';
export default class PostCard extends Component {
	onBtnClick(){
		//show the post only with comments
	}

	render(){
		return (
			<div>
			<Row>
			<Col sm={{ size: 6, push: 2, pull: 2, offset: 1 }}>
			<Card>
			<CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
			<CardImgOverlay>
			<CardTitle className="text-left">{this.props.title}</CardTitle>
			</CardImgOverlay>
			<CardBlock>
			<CardText className="text-left">{this.props.text}</CardText>
			<Button onClick={this.onBtnClick} color="primary">View</Button>
			</CardBlock>
			<CardFooter>{this.props.time} By {this.props.by}</CardFooter>
			</Card>
			</Col>
			</Row>
			</div>
			);
	}
}		