class Database {
	constructor(){
		this.mongoose = require('mongoose');
		this.mongoose.Promise = global.Promise;
	};

	connect(url, app){
		this.url = url;
		this.app = app;

		this.mongoose.connect(this.url).then(() => {
			console.log('connected to mongo');
		}, (err) => {
			console.log(err.message);
			console.log('Connecting to mongo failed');
		});
	};
}
module.exports = new Database();