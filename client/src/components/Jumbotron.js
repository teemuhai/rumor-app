import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';

export default class JumboTron extends Component {
	render(){
		return (
    <div>
      <Jumbotron>
        <h1 className="display-3">Rumor-app</h1>
        <p className="lead">This application is used for creating posts to be viewed and commented by other users.</p>
        <hr className="my-2" />
        <p>Login or register for an account to start making posts!</p>
        <p>Or you can just go view other people's post by going to Feed!</p>
      </Jumbotron>
    </div>
  );
	}
}