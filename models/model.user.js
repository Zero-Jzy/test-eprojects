var mongoose = require('mongoose');

var users = new mongoose.Schema({
    email: String,
    password: String,
    fullname: String,
    username: String,
    phone: String
});

var user = mongoose.model('user', users);

module.exports = user;