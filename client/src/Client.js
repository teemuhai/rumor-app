	const register = (data) => {
	console.log('got to register method');
	fetch('/register', {
		method: 'POST',
		body: data
	}).then((resp) => {
		console.log('got response');
	});
}
	const login = (data) => {
		console.log('got to login method');
		fetch('/login', {
			method: 'POST',
			body: data
		}).then((resp) => {
			console.log('got response');
		});
	}
	const Client = {register, login};
export default Client;