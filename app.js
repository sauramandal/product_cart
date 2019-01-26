const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const config = require('./config');
const path = require('path');
const {getIndexPage} = require('./routes/index');
const {addProductPage, addProduct} = require('./routes/product');

var app = express();
var port = process.env.PORT || 3000;


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));
app.use(fileUpload()); //configure fileupload

app.listen(port, function() {
  console.log(`Express server started on port: ${port}`);
});

app.get('/', getIndexPage);
app.get('/addProduct', addProductPage);
app.post('/addProduct', addProduct);
