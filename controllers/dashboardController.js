const Flash = require('../utils/Flash')


module.exports = {
    dashboardGetController: (req, res, next) => {
        req.flash('success', 'login successful')
        return res.render('pages/dashboard/dashboard', { title: 'my dashboard', flashMessage: Flash.getMessage(req) })
    }
}