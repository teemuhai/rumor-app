const mongoose = require('mongoose');

const postCardSchema = mongoose.Schema({
	title: { type: String,
				index: true },
	image: { type: String, default: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180'},
	description: { type: String },
	time: { type: String },
	user: { type: String, default: 'testUser'},
	userId: { type: String, default: '123'},
	comments: [{comment: String,
				user: String}]
});

const PostCard = module.exports = mongoose.model('PostCard', postCardSchema);

module.exports.createPostCard = (newPostCard, callbackx) => {
	newPostCard.save((callback, err) => {
  //if (err) throw err;
  console.log('PostCard saved to database');
  callbackx();
});

}

module.exports.updatePostCard = (data, callback) => {
	PostCard.update(
    { _id: data.id },
    { $push: {comments: {comment: data.comment, user: data.user}}}
    ).then((res)=>{
    	console.log(res);
    	callback(res);
    });
    console.log('Comment added?');
}

//{ $elemMatch: {id: 123}}
module.exports.getUserPostCards = (data, callback) => {
	PostCard.find({userId: data.userId}, (err, results) => {
		if(!err){
			callback(results);
		}
		else {
			console.log('error:');
			console.log(err);
		}
	});
}


module.exports.getPostCardById = (id, callback) => {
	PostCard.findById(id, callback);
}

module.exports.getPostCards = () => {
	const promise = PostCard.find().exec();
        return promise;
}

module.exports.deletePostCard = (data, callback) => {
	PostCard.remove({_id: data.id}, (err, results) => {
		if(!err){
			console.log('deleted!');
			callback(results);
		}
		else {
			console.log('error: ');
			console.log(err);
		}
	})
}