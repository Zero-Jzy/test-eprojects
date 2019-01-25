var products = require('../models/model.product');

exports.create = function (req, res) {
    res.render('products/create.products.ejs');
};

exports.index = function (req, res) {
    // products.find().exec(function (err, products) {
    //     if(err) console.log('loi cmnr');
    //     res.render('products/index', {products: products});
    // });
    res.render('client/catagoris.ejs');
};

exports.details = function (req, res) {
    // products.find().exec(function (err, products) {
    //     if(err) console.log('loi cmnr');
    //     res.render('products/index', {products: products});
    // });

    res.render('client/product');
};

exports.postCreate = function (req, res) {
    products.create(req.body);
    console.log(req.body);
    res.redirect('/products')
};

exports.detail = function (req, res) {
    products.findById(req.params.id, function(err, result){
        res.render('products/details',{product: result});
    });
};

exports.update = function (req, res) {
    console.log(req.body);
    products.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, result) {
        if (err) {
            console.log("Can't update product !!");
            return
        }
        res.redirect('/products')
    });
};

exports.delete = function (req, res) {
    products.deleteOne(req.body, function (err, rusult) {
        if(err){
            console.log("Can't delete product !!");
            return
        }
        res.json('ok');
});
};


