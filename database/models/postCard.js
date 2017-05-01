const mongoose = require('mongoose');

const postCardSchema = mongoose.Schema({
	title: { type: String,
				index: true },
	image: { type: String, default: '.../images/default'},
	description: { type: String },
	time: { type: String },
	userId: {type: String, default: '123' }
});

const PostCard = module.exports = mongoose.model('PostCard', postCardSchema);

module.exports.createPostCard = (newPostCard, callback) => {
	newPostCard.save((callback, err) => {
  if (err) throw err;
  // saved!
  console.log('PostCard saved to database');
});

}

/*
module.exports.getPostCardByName = (postCardName, callback) => {
	var query = {username: username};
	User.findOne(query, callback);
}*/

module.exports.getPostCardById = (id, callback) => {
	PostCard.findById(id, callback);
}

module.exports.getPostCards = () => {
	const promise = PostCard.find().exec();
        return promise;
}

/*
module.exports.comparePassword = (candidatePassword, hash, callback) => {
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}*/