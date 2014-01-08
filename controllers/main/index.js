
// export index
exports.index = {
    path: '/',
    method: 'get',
    returns: function(req, res){
        res.render('index');
    }
};
