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

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.connect();
  connection.query('SELECT * FROM test', function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      console.log(results);
      res.render('index', { title: 'Express' });
    }
  });
  connection.end();
});

module.exports = router;
