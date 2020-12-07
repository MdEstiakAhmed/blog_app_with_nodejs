const { Schema, model } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;
const Profile = require('./Profile');

const userSchema = new Schema({
	name: {
		type: String,
		trim: true,
		maxLength: 30,
		required: true
	},
	email: {
		type: String,
		trim: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profile: {
		type: ObjectId,
		ref: Profile
	}
}, {
	timestamps: true
});

const User = model('User', userSchema);
module.exports = User