// includes
var express = require('express'),
    config = require('./config');

// deploy test
// make app
var app = module.exports = express();

// load view engine config
require('./config/viewengine')(app, __dirname);

// load main app config
require('./config/main')(app);

// load sessions config
require('./config/session')(app);

// load flash messages config
require('./config/flashmessaging')(app);

// load access control
require('./config/accesscontrol')(app);

// load controllers
require('./lib/boot')(app, { verbose: !module.parent });

// load error routes (404. 5xx)
require('./config/errorhandling')(app);

if (!module.parent) {
    app.use(express.logger('dev'));

    app.listen(config.defaultPort);
    console.log('\n  listening on port '+config.defaultPort+'\n');
}
