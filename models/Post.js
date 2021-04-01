const { Schema, model } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;
// const User = require('./User');
// const Comment = require('./Comment');

const postSchema = new Schema({
	title: {
		type: String,
		trim: true,
		maxLength: 100,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	author: {
		type: ObjectId,
		ref: 'User',
		required: true
	},
	tags: {
		type: [String]
	},
	thumbnail: String,
	readTime: String,
	likes: [{
        type: ObjectId,
        ref: 'User'
    }],
	dislikes: [{
        type: ObjectId,
        ref: 'User'
    }],
	comments: [{
		type: ObjectId,
		ref: 'Comment'
	}]
}, {
	timestamps: true
});

const Post = model('Post', postSchema);
module.exports = Post