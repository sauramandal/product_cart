const mysql = require('mysql');
const {connection} = require('./../database');
const config = require('./../config');

var getIndexPage = (req, res) => {
  let queryString = "SELECT * FROM ?? ORDER BY ? ASC LIMIT 10";
  let tableContents = ["TB_PRODUCT", "created_at"];
  queryString = mysql.format(queryString, tableContents);
  connection.query(queryString, (err, rows) => {
    if(err) {
      return res.redirect('/');
    }
    console.log(rows);
    res.render('index.ejs', {
      title: 'Welcome to Shopping proto',
      products: rows
    });
  });
};

module.exports = {getIndexPage};
