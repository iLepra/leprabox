// requires
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    db = require('./db').db,
    lepraccSchema, LeprAcc;

lepraccSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'users'},
    cookie: [String]
});

// Model
LeprAcc = mongoose.model('lepracc', lepraccSchema);

// export
exports.LeprAcc = LeprAcc;