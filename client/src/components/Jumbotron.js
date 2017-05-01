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
        <p>Developed by Teemu Rytsölä for a school project.</p>
      </Jumbotron>
    </div>
  );
	}
}