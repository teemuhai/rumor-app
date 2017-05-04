import {EventEmitter} from 'events';

import * as UserActions from './actions/UserActions';
import dispatcher from './dispatcher';

class Client extends EventEmitter {
	constructor(){
		super()
		this.posts = [];
		this.auth = false;
		this.user = {};
		this.userPosts = [];
	}

	getAuth(){
		return this.auth;
	}
	getUser(){
		
		return this.user;
	}

	getUserPosts(){
		this.userPosts = this.userPosts.reverse();
		return this.userPosts;
	}
	
	getAll(){
		this.posts = this.posts.reverse();
		return this.posts;
	}

	handleActions(action){
		switch(action.type){
			case 'CREATE_POST':
				console.log(action.text);
				break;
			case 'RECEIVED_POSTS':
				this.posts = action.posts;
				this.emit('change');
				break;
			case 'RECEIVED_USER_POSTS':
				this.userPosts = action.posts;
				this.emit('change');
				break;
			case 'DELETE_POST':
				const delData = {
				userId: this.user._id
				}
				UserActions.getUserPosts(delData);
				break;
			case 'LOGIN_USER':
				this.user = action.user;
				this.auth = action.auth;
				console.log('should now get the user posts pls');
				const data = {
				userId: this.user._id
				}
				UserActions.getUserPosts(data);
				this.emit('change');
				break;
			case 'LOGOUT_USER':
				this.user = {};
				this.auth = false;
				this.emit('change');
				break;
		}
	}
}
const client = new Client;

dispatcher.register(client.handleActions.bind(client));

export default client;



/*
	let posts = []
	let auth = false;
	let user = {};

	const register = (data) => {
	console.log('got to register method');
	fetch('/register', {
		method: 'POST',
		body: data
	}).then((resp) => {
		if(resp.ok){
				console.log('got register response');
				resp.json();			
		}
	}).then((resp) => {
		console.log(resp);
		//user = resp.user;
	});
}
	const login = (data) => {
		console.log('got to login method');
		fetch('/login', {
			method: 'POST',
			body: data
		}).then((resp) => {
			console.log('got login response ');
			return resp.json();
		}).then((resp) => {
			if(resp.ok){
			console.log(resp);
			auth = resp.auth;
			user = resp.user;	
			}
			else {
				console.log('wrong username or password');
			}
		});
	}

	const post = (data) => {
		console.log('got to post method');
		fetch('/post', {
			method: 'POST',
			body: data
		}).then((resp) => {
			if(resp.ok){
			console.log('got post response');
			return resp.json();
			}
		}).then((resp) => {
			console.log('resp json:' + resp);
		});
	}

	const getPosts = () => {
		console.log('got to getPosts method');
		fetch('/posts', {
			method: 'GET'
		}).then((resp) => {
			console.log('got response');
			return resp.json();
		}).then((resp) => {
			posts = resp;
			console.log(posts);
			return posts;
		});
		return posts;
	}
	const Client = {register, login, post, auth, getPosts, posts};
export default Client;*/