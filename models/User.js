const { Schema, model} = require('mongoose');
const { ObjectId } = Schema.Types;
const { insert, find } = require('./Database');

const userSchema = new Schema({
	username: {
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
		ref: 'Profile'
	}
}, {
	timestamps: true
});

const User = model('User', userSchema);

module.exports = {
	registerUser: async(data) => {
		let {username, email, password} = data;
		let dataModel = new User({ username, email, password });

		try {
			let result = await insert(dataModel);
			return result;
		} 
		catch (error) {
			return error;
		}
	},

	findUser: async(data) => {
		try {
			let result = await find(User, data)
			return result
		} 
		catch (error) {
			return error
		}
	}
}
