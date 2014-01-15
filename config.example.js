// if debug is enabled
exports.debug = true;

// cookies stuff
exports.sidSalt = 'initMe';
exports.cookieParserSalt = 'initMeToo';
exports.cookieSecret = 'andMeToo';

// default app port
exports.defaultPort = 8080;

// default db
exports.db = 'mongodb://localhost/leprabox';

// session config
exports.sessionDb = {
    url: exports.db
};
