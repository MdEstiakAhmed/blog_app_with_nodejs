exports.localMiddleWare = () => {
    return(req, res, next) => {
        res.locals.user = req.user;
        res.locals.isLogIn = req.session.isLogIn;
        next();
    }
}