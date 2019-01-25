var users = require('../models/model.user');

module.exports.index = function (req, res) {
    users.find().exec(function (err,users) {
        res.render('users/index',{users:users});
    });
};

module.exports.register = function (req, res) {
    res.render('users/register');
};

module.exports.postRegister = function(req, res){
    console.log(req.body);
    users.create(req.body, function (err) {
        if (err) {console.log('Looi cmnr');}
    });
    res.redirect('/users');
};

module.exports.login = function (req, res) {
    res.render('users/login');
};

