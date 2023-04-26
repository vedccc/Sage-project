
module.exports.admin = function(req, res, next) {
    if(typeof req.session.user != "undefined" && req.session.user._id) {
        res.locals.user = req.session.user;
        next();
    } else {
        res.redirect('/');
    }
};