import dispatcher from '../dispatcher';

export function createPost(data){
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
			getPosts();
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