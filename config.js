// if debug is enabled
exports.debug = true;

// cookies stuff
exports.sidSalt = 'initMe';
exports.cookieParserSalt = 'initMeToo';
exports.cookieSecret = 'andMeToo';

// default app port
exports.defaultPort = 8080;

// session config
exports.sessionOptions = {
    storeType: 'file',
    storeOptions: {
        path: './sessions/',
        useAsync: true,
        reapInterval: 5000,
        maxAge: 100000
    }
};
