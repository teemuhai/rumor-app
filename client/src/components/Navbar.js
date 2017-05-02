import React, { Component } from 'react';
import Client from '../Client.js'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import {
  BrowserRouter as Router,
  Route,
  Link, NavLink as RouterLink
} from 'react-router-dom';


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
                <NavLink><RouterLink to="/newpost" className="nav-link">New Post</RouterLink></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><RouterLink to="/feed" className="nav-link">Feed</RouterLink></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><RouterLink to="/login" className="nav-link">Login</RouterLink></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><RouterLink to="/profile" className="nav-link">Profile</RouterLink></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
			);
	}
}		