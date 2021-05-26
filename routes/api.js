const express = require('express');

const router = express.Router();

/* Setup MySQL connection */
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lpt',
});

// Form of data is array of objects:
//  RowDataPacket {
//    trace_id: 50,
//    trace_data: ...
//    trace_time: 2019-01-17T15:30:08.000Z
// }

/* GET request for blob data. */
router.get('/', (req, res, next) => {
  connection.connect();
  connection.query('SELECT * FROM test', (error, results, fields) => {
    if (error) {
      throw error;
    } else {
      console.log(results);
      res.send('Api route called');
    }
  });
  connection.end();
});

module.exports = router;
