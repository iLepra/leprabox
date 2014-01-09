// includes
var express = require('express'),
    passport = require('passport'),
    config = require('./config'),
    SessionStore = require('connect-session-store'),
    dust = require('dustjs-linkedin'),
    cons = require('consolidate');

// deploy test
// make app
var app = module.exports = express();

// settings
// map .renderFile to ".html" files
app.engine('html', cons.dust);

// make ".html" the default
app.set('view engine', 'html');

// set views for error and 404 pages
app.set('views', __dirname + '/views');

// serve static files
app.use(express.static(__dirname + '/public'));

// session support
app.use(express.cookieParser(config.cookieParserSalt));
app.use(express.session({
    secret: config.cookieParserSalt + config.sidSalt,
    store: new SessionStore(config.sessionOptions)
}));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// parse request bodies (req.body)
app.use(express.json());
app.use(express.urlencoded());

// support _method (PUT in forms etc)
app.use(express.methodOverride());

// locals
app.use(function(req, res, next) {
    var render = res.render;
    res.render = function(view, locals, cb) {
        if (typeof locals === 'object') locals.debug = config.debug;
        if (locals === undefined) locals = { debug: config.debug };
        render.call(res, view, locals, cb);
    };
    next();
});

// load controllers
require('./lib/boot')(app, { verbose: !module.parent });

// assume "not found" in the error msgs
// is a 404. this is somewhat silly, but
// valid, you can do whatever you like, set
// properties, use instanceof etc.
app.use(function(err, req, res, next) {
    // treat as 404
    if (~err.message.indexOf('not found')) {
        return next();
    }

    // deauth
    if(~err.message.indexOf('401')) {
        res.redirect('/auth');
        return;
    }

    // log it
    console.error(err.stack);

    // error page
    res.status(500).render('5xx');
});

// assume 404 since no middleware responded
app.use(function(req, res, next) {
    res.status(404).render('404', { url: req.originalUrl });
});

if (!module.parent) {
    app.use(express.logger('dev'));

    app.listen(config.defaultPort);
    console.log('\n  listening on port '+config.defaultPort+'\n');
}
