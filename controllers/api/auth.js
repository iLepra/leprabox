// includes
var User = require('../../db/user').User;
var passport = require('passport');
var passportLocal = require('passport-local');

// make passport policy
var LocalStrategy = passportLocal.Strategy;
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({user: username}, function(err, user) {
            console.log(user, user.password, password);
            if (err) return done(err);
            if (!user) return done(null, false);
            if (user.password !== password) return done(null, false);
            return done(null, user);
        });
    }
));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findOne({_id: id}, function(err, user) {
        done(err, user);
    });
});

// export index
exports.register = {
    path: '/api/register',
    method: 'post',
    returns: function(req, res, next){
        // check password for match
        if(req.body.pass != req.body.passCheck) {
            req.flash('error', 'Пароли не совпадают!');
            return res.redirect('/registration');
        }

        // make new user data
        var newUser = {
            user: req.body.username,
            password: req.body.pass
        };

        // check if user exists
        User.findOne(newUser, function(err, user) {
            if (err) return next(err);

            if(user){
                req.flash('error', 'Пользователь уже существует!');
                return res.redirect('/registration');
            } else {
                // create new user
                var userModel = new User(newUser);
                userModel.save(function(err){
                    if (err) {
                        return next(err);
                    } else {
                        // if all is OK, redirect to root
                        return res.redirect('/');
                    }
                });
            }
        });
    }
};

exports.login = {
    path: '/api/login',
    method: 'post',
    returns: function(req, res, next){
        passport.authenticate('local', function(err, user, info) {
            if (err) return next(err);
            if (!user) {
                req.flash('error', 'Неверный логин или пароль!');
                return res.redirect('/login');
            }
            req.login(user, function(err) {
                if (err) return next(err);
                // redirect to the user profile on success
                return res.redirect('/');
            });
        })(req, res, next);
    }
};

