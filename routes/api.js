var express = require('express');
var router = express.Router();

/* Setup MySQL connection */
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lpt',
});

/* GET request for blob data. */
router.get('/', function(req, res, next) {
  connection.connect();
  connection.query('SELECT * FROM test', function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      res.render('index', { title: 'Express' });
    }
  });
  connection.end();
  res.send('respond with a resource');
});

module.exports = router;
