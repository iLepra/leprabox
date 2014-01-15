// includes
var User = require('../../db/user').User;

// export index
exports.index = {
    path: '/',
    method: 'get',
    returns: function(req, res, next){
        if(req.user) {
            return res.render('index');
        }

        // check if user is admin
        User.findOne({}, function(err, user){
            if (err) {
                next(err);
            } else {
                if(user){
                    res.redirect('/login');
                } else {
                    res.redirect('/registration');
                }
            }
        });
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

// login
exports.register = {
    path: '/registration',
    method: 'get',
    returns: function(req, res, next){
        //console.log(req.body.error);
        res.render('register', {error: req.flash('error')});
    }
};
