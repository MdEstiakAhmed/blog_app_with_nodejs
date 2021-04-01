const bcrypt = require('bcryptjs');
const { registerUser, findUser } = require('../models/User');
const {validationResult} = require('express-validator');
const Flash = require('../utils/Flash')

module.exports = {
	signupGetController: (req, res, next) => {
		res.render('pages/auth/signup', 
		{ title: 'Create a new account', value: {}, formError: {}, serverError: {}, flashMessage: {} })
	},

	signupPostController: async (req, res, next) => {
		let { username, email, password, confirmPassword } = req.body;
		let errors = validationResult(req).formatWith(error => error.msg)

		if(!errors.isEmpty()){
			req.flash('fail', 'please check your form')
			return res.render('pages/auth/signup', 
			{ title: 'Create a new account', value: {username, email, password}, formError: errors.mapped(), serverError: {}, flashMessage: Flash.getMessage(req)})
		}

		try {
			let hashedPassword = await bcrypt.hash(password, 10);
			let data = { username, email, password: hashedPassword };
			let result = await registerUser(data);
			req.flash('success', 'signup successful')
			return res.render('pages/auth/signup', 
			{ title: 'Create a new account', value: {}, formError: {}, serverError: {}, flashMessage: Flash.getMessage(req)})
		} 
		catch (error) {
			req.flash('fail', 'server error')
			return res.render('pages/auth/signup', 
			{ title: 'Create a new account', value: {username, email, password}, formError: {}, serverError: error, flashMessage: Flash.getMessage(req)})
		}
	},

	loginGetController: (req, res, next) => {
		if(req.session.isLogIn || req.session.user){
			console.log(req.session.isLogIn);
			console.log(req.session.user);
		}
		res.render('pages/auth/login', 
		{ title: 'login into you account', value: {}, formError: {}, serverError: {}, flashMessage: {} })
	},

	loginPostController: async (req, res, next) => {
		let { email, password } = req.body;

		try {
			let data = {email}
			let result = await findUser(data)
			if(result){
				let match = await bcrypt.compare(password, result.password)
				if(match){
					req.session.isLogIn = true;
					req.session.user = result;
					req.flash('success', 'login successful')
					return res.redirect('/dashboard');
				}
				else{
					req.flash('fail', 'no user found')
					return res.render('pages/auth/login', 
					{ title: 'login into you account', value: {email, password}, formError: {error: 'invalid credential'}, serverError: {}, flashMessage: Flash.getMessage(req)})
				}
			}
			else{
				req.flash('fail', 'invalid credential')
				return res.render('pages/auth/login', 
				{ title: 'login into you account', value: {email, password}, formError: {error: 'invalid credential'}, serverError: {}, flashMessage: Flash.getMessage(req)})
			}
		} 
		catch (error) {
			req.flash('fail', 'server error')
			return res.render('pages/auth/login', 
			{ title: 'login into you account', value: {}, formError: {}, serverError: {error}, flashMessage: Flash.getMessage(req)})
		}
	},

	logoutController: (req, res, next) => {
		req.session.destroy(error => {
			if(error){
				console.log(error);
				next();
			}
			return res.redirect('/auth/login');
		})
	},
}