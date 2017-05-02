import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/LoginPage';
import NavBar from './components/Navbar';
import Feed from './pages/Feed';
import JumboTron from './components/Jumbotron';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';
import {
  BrowserRouter as Router,
  Route,
  Link, hashHistory, IndexRoute
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router history={hashHistory}>
      <div>
      <NavBar />
      <Route path="/home" component={JumboTron}/>
      <Route path="/feed" component={Feed}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/newpost" component={PostPage}/>
      <Route path="/profile" component={ProfilePage}/>
      </div>
      </Router>
    {/* <Register />
        <Login />
        <br />
        <Post />
      <JumboTron />
      <Feed />
      */}
      </div>
    );
  }
}

export default App;
