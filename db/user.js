// requires
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    db = require('./db').db,
    userSchema, User;

userSchema = new Schema({
    user: String,
    password: String
});

// Model
User = mongoose.model('users', userSchema);

// export
exports.User = User;