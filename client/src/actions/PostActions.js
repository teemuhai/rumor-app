import dispatcher from '../dispatcher';

import * as PostActions from '../actions/PostActions';

export function createPost(data){
	console.log('got to post method');
		fetch('/post', {
			method: 'POST',
			body: data
		}).then((resp) => {
			if(resp.ok){
			console.log('got post response');
			return resp;
			}
		}).then((resp) => {
			console.log(resp);
			PostActions.getPosts();
		});
	 	/*dispatcher.dispatch({
		type: 'CREATE_POST',
		text,
	});*/
}


export function commentPost(data){
	console.log(data);
	console.log('got to commentPost method');
	fetch('/comment', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then((resp) => {
		return resp.json();
	}).then((resp) => {
		PostActions.getPosts();
		console.log(resp);
	});
}

export function getPosts(){
	console.log('got to getPosts method');
		fetch('/posts', {
			method: 'GET'
		}).then((resp) => {
			console.log('got response');
			return resp.json();
		}).then((resp) => {
			console.log(resp);
			dispatcher.dispatch({
			type: 'RECEIVED_POSTS', 
			posts: resp,
		});
	});
}