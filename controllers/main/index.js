// includes
var User = require('../../db/user').User;
var LeprAcc = require('../../db/lepracc').LeprAcc;
var lepralib = require('lepralib');
lepralib.config.debug = true;

// export index
exports.index = {
    path: '/',
    method: 'get',
    returns: function(req, res, next){
        // if user authorised
        if(req.user) {
            // check if there are any bound lepra accounts
            LeprAcc.findOne({}, function(err, lepracc) {
                if(err) {
                    next(err);
                } else {
                    // if there are lepra account, render main
                    if(lepracc) {
                        return res.redirect('/main');
                    } else { // if there're none, request bindings
                        return res.redirect('/linklepra');
                    }
                }
            });
        } else {
            // check if user is admin
            User.findOne({}, function(err, user){
                if (err) {
                    next(err);
                } else {
                    if(user){
                        return res.redirect('/login');
                    } else {
                        return res.redirect('/registration');
                    }
                }
            });
        }
    }
};

// lepra - main
exports.main = {
    path: '/main',
    method: 'get',
    returns: function(req, res, next){
        res.render('index');
    }
};


// login
exports.login = {
    path: '/login',
    method: 'get',
    returns: function(req, res, next){
        res.render('login', {error: req.flash('error')});
    }
};

// register new ilepra account
exports.register = {
    path: '/registration',
    method: 'get',
    returns: function(req, res, next){
        res.render('register', {error: req.flash('error')});
    }
};

// attach lepra account
exports.linklepra = {
    path: '/linklepra',
    method: 'get',
    returns: function(req, res, next){
        if(lepralib.captchaURL) {
            // render binding view
            return res.render('linklepra', {error: req.flash('error'), captchaImage: lepralib.captchaURL});
        } else {
            // fetch capthca code
            lepralib.init(null, function(success) {
                if(success) {
                    // we are logged in? WAT?
                    return res.render('5xx');
                }

                // render binding view
                res.render('linklepra', {error: req.flash('error'), captchaImage: lepralib.captchaURL});
            });
        }
    }
};
