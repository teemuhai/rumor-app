import React, { Component } from 'react';
import Client from '../Client.js'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class NavBar extends Component {
	 constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleClick(){
  	Client.getPosts();
  	//className="ml-auto"
  }

	render(){
		return (
			<div>
        <Navbar className="navbar navbar-toggleable-md navbar-inverse bg-primary">
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">Rumor-App</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="mx-auto"  width="200px">New Post</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.handleClick}>Feed</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Login</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
			);
	}
}		