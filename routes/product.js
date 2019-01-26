const mysql = require('mysql');
const express = require('express');
const md5 = require('md5');
const {connection} = require('./../database');
const config = require('./../config');
const fs = require('fs');

var addProductPage = (req, res) => {
  res.render('product/add-product.ejs', {
    title: 'Add a new product',
    message: ''
  });
};

var addProduct = (req, res) => {
  if(!req.files) {
    return res.status(400).send("No files were uploaded");
  }
  var date = new Date();
  var uploadedFile = req.files.product_image;
  var imageName = uploadedFile.name;
  var fileExtension = uploadedFile.mimetype.split('/')[1];
  imageName = req.body.product_name + '.' + fileExtension;

  var product = {
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    product_price: req.body.product_price,
    product_image: imageName,
    created_at: date
  };
  console.log(product);
  //check the filetype before uploading it
  if(uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
    //upload the file to the /public/assets/img directory
    uploadedFile.mv(`public/assets/img/${imageName}`, (err) => {
      if(err) {
        return res.status(500).send(err);
      }
      //insert data to db
      var queryString = "INSERT INTO ?? SET ?";
      var table = ["TB_PRODUCT"];
      queryString = mysql.format(queryString, table);
      connection.query(queryString, product, (err, rows) => {
        if(err) {
          return rse.status(500).send(err);
        } else {
          res.redirect('/');
        }
      });
    });
  } else {
    message = "Invalid file format. Only 'gif','jpeg' and 'png' are allowed";
    res.render('product/add-product.ejs', {
      message,
      title: 'Add a product'
    });
  }
};

module.exports = {addProductPage, addProduct};
