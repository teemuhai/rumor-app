import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class Comment extends Component {
	render(){
		return (
    <div>
      <p>{this.props.user}: {this.props.comment}</p>
    </div>
  );
	}
}