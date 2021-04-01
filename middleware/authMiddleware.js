const {findUser} = require('../models/User')
exports.bindUserWithRequest = () => {
    return async(req, res, next) => {
        if(!req.session.isLogIn){
            next();
        }
        else{
            try {
                let result = await findUser({_id: req.session.user._id});
                req.user = result;
                next();
            } 
            catch (error) {
                console.log(error);
                next(error);
            }
        }
    }
}

exports.isAuthenticate = (req, res, next) => {
    if(!req.session.isLogIn){
        return res.redirect('/auth/login');
    }
    next();
}

exports.isUnAuthenticated = (req, res, next) => {
    if(req.session.isLogIn){
        return res.redirect('/dashboard');
    }
    next();
}