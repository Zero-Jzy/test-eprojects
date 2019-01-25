const express = require('express');
const ejs = require('ejs');
var bodyParser = require('body-parser');
var userRouter = require('./routers/users.route.js');
var mongoose = require('mongoose');
var productRouter = require('./routers/products.route');

const fileUpload = require('express-fileupload');
var cloudinary = require('cloudinary');

mongoose.connect('mongodb://chailo:chailo123@ds163014.mlab.com:63014/mydb', { useNewUrlParser: true });

const app = express();
var post = 3000;
cloudinary.config({
    cloud_name: 'aptechaaa',
    api_key: '526575171756629',
    api_secret: 'eZ2NHOdPR_pXU9rThNe1W6ewEfQ'
});

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/users', userRouter);

app.use('/products', productRouter);

app.get('/',function (req, res) {
    res.render('client/home');
});

app.listen(post, () => console.log("Chạy thành Công ở cổng " + post));