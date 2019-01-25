var mongoose = require('mongoose');

var products = new mongoose.Schema({
    name: String,
    linkimg: String,
    descreption: String,
    price: String
});

module.exports = mongoose.model('product', products);
