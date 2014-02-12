// includes
var User = require('../../db/user').User;
var LeprAcc = require('../../db/lepracc').LeprAcc;
var lepralib = require('lepralib');

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
