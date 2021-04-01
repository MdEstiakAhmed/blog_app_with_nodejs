const {body} = require('express-validator');
const { findUser } = require('../models/User');

module.exports = {
    signupValidator: [
        body('username')
        .isLength({min: 3, max: 15}).withMessage('username must be between 3 to 15 character')
        .custom(async username => {
            let result = await findUser({username})
            if(result){
                return Promise.reject('Username already exist')
            }
            return true;
        })
        .trim(),
    
        body('email')
        .isEmail().withMessage('please provide a valid email')
        .custom(async email => {
            let result = await findUser({email})
            if(result){
                return Promise.reject('email already exist')
            }
            return true;
        })
        .normalizeEmail(),
    
        body('password')
        .isLength({min: 5}).withMessage('password must be greater then or equal 5 character'),
    
        body('confirmPassword')
        .custom((confirmPassword, {req}) => {
            if(confirmPassword !== req.body.password){
                throw new Error('password does not match')
            }
            return true;
        })
    ]
}