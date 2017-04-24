import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to rumor son of rumor</h2>
        </div>
        <Register />
        <Login />
      </div>
    );
  }
}

export default App;
