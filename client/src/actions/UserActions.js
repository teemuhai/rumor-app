import dispatcher from '../dispatcher';

//import * as UserActions from '../actions/UserActions';

export function createUser(data){
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

export function getUser(){
	console.log('going for get user method');
	fetch('/user', {
		method: 'GET'
	}).then((resp) => {
		return resp.json();
	}).then((resp) => {
		console.log(resp);
	});
}

export function deletePost(data){
	console.log(data);
	console.log('got to deletePost method');
	fetch('/deletepost', {
		method: 'DELETE',
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify(data)
	}).then((resp) => {
		return resp.json();
	}).then((resp) => {
		console.log(resp);
		console.log('delete succesfull??');
		dispatcher.dispatch({
			type: 'DELETE_POST'
		});
	});
}

export function loginPost(data){
		console.log('got to login method');
		fetch('/login', {
			method: 'POST',
			body: data
		}).then((resp) => {
			console.log('got login response ');
			return resp.json();
		}).then((resp) => {
			console.log(resp);
			dispatcher.dispatch({
				type: 'LOGIN_USER',
				user: resp.user,
				auth: resp.auth
			});
		});
}

export function logout(){
	console.log('got to logout method');
	fetch('/logout', {
		method: 'GET'
	}).then((resp) => {
		return resp;
	}).then((resp) => {
		console.log('got logout response');
		console.log(resp);
		dispatcher.dispatch({
			type: 'LOGOUT_USER'
		});
	});
}

export function getUserPosts(data){
	console.log('got to getPosts method');
		fetch('/userposts', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
		},
			body: JSON.stringify(data)
		}).then((resp) => {
			console.log('got response');
			return resp.json();
		}).then((resp) => {
			console.log(resp);
			dispatcher.dispatch({
			type: 'RECEIVED_USER_POSTS', 
			posts: resp
		});
	});
}