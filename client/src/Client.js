	const register = (data) => {
	console.log('got to register method');
	fetch('/register', {
		method: 'POST',
		body: data
	}).then((resp) => {
		console.log('got register response');
	});
}
	const login = (data) => {
		console.log('got to login method');
		fetch('/login', {
			method: 'POST',
			body: data
		}).then((resp) => {
			console.log('got login response ' + resp.auth);
		});
	}

	const post = (data) => {
		console.log('got to post method');
		fetch('/post', {
			method: 'POST',
			body: data
		}).then((resp) => {
			console.log('got post response');
		});
	}
	const Client = {register, login, post};
export default Client;