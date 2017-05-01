import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/Navbar';
import Feed from './components/Feed';
import JumboTron from './components/Jumbotron';

class App extends Component {
  render() {
    return (
      <div className="App">
    {/* <Register />
        <Login />
        <br />
        <Post />
      */} 
      <NavBar />
      <JumboTron />
      <Feed />
      </div>
    );
  }
}

export default App;
