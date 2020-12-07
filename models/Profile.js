const { Schema, model } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;
const Post = require('./Post');
const User = require('./User');

const profileSchema = new Schema({
	user: {
		type: ObjectId,
		ref: User,
		required: true
	},
	title: {
		type: String,
		trim: true,
		maxLength: 100
	},
	bio: {
		type: String,
		trim: true,
		maxLength: 500
	},
	profilePic: String,
	links: {
		website: String,
		facebook: String,
		twitter: String,
		github: String
	},
	posts: [
		{
			type: ObjectId,
			ref: Post
		}
	],
	bookmarks: [
		{
			type: ObjectId,
			ref: Post
		}
	]
}, {
	timestamps: true
});

const Profile = model('Profile', profileSchema);
module.exports = Profile