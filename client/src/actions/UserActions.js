import dispatcher from '../dispatcher';

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
	/* 	dispatcher.dispatch({
		type: 'CREATE_POST',
		text,
	});*/
}

export function deletePost(id){
	dispatcher.dispatch({
		type: 'DELETE_POST',
		id,
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

export function getUserPosts(data){
	console.log('got to getPosts method');
		fetch('/userposts', {
			method: 'POST',
			body: data
		}).then((resp) => {
			console.log('got response');
			return resp.json();
		}).then((resp) => {
			console.log(resp);
			dispatcher.dispatch({
			type: 'RECEIVED_USER_POSTS', 
			posts: resp.posts
		});
	});
}