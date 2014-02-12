// includes
var User = require('../../db/user').User;
var LeprAcc = require('../../db/lepracc').LeprAcc;
var lepralib = require('lepralib');

// check if user is in db
var checkUserCreated = function(req, res, next) {
    if(req.user) return next();

    // check if user is admin
    User.findOne({}, function(err, user) {
        if (err) {
            return next(err);
        } else {
            if(user) {
                return res.redirect('/login');
            } else {
                return res.redirect('/registration');
            }
        }
    });
};

// get leproaccount for current user
var getLepracc = function (req, res, next) {
    // check if there are any bound lepra accounts
    LeprAcc.findOne({}, function(err, lepracc) {
        if(err) {
            return next(err);
        } else {
            req.lepracc = lepracc;
            return next();
        }
    });
};

// export index
exports.index = {
    path: '/',
    method: 'get',
    returns: [checkUserCreated,
    getLepracc,
    function(req, res, next) {
        // if there's no lepra account, redirect to linking
        if(!req.lepracc) return res.redirect('/linklepra');

        var getPosts = function() {
            lepralib.getLastPosts(false, function (success) {
                if(success){
                    var posts = lepralib.latestPosts;
                    posts.forEach(function(post) {
                        // strip images
                        post.body = post.body.replace(/<img.+?>/g, '');
                        // remove body if no text
                        if(post.text.length < 5) post.body = null;
                    });
                    return res.render('index', {posts: posts});
                }else{
                    return next(new Error('Error getting latest posts'));
                }
            });
        };

        // if authed, just re-fetch posts
        if(lepralib.isAuthenticated) {
            getPosts();
        } else { // otehrwise init with cookies
            lepralib.init(req.lepracc.cookie, function (success) {
                if(success) {
                    getPosts();
                } else {
                    return next(new Error('Error initializing lepralib'));
                }
            });
        }
    }]
};
