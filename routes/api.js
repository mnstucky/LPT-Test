const express = require('express');

const router = express.Router();

// Form of data returned by API is an array of these objects:
//
// {
//   id: 50,
//       powerLevels: [
//   -52.789, -52.399, -52.439,   -54.5, -52.979, -52.869,  -54.75,
//   -52.759, -54.439,  -52.82,  -52.96,  -52.89,  -53.39, -51.179,
//   -53.179,  -54.17,  -52.82, -53.979,  -53.06,  -52.27,  -53.24,
//   -53.539, -54.189,  -54.99, -53.979, -54.429,  -52.27, -53.439,
//   -51.219,  -52.84,  -51.57, -54.409, -52.929, -51.929,  -53.07,
//   -53.45,  -51.07,  -52.75, -53.149, -53.289,  -52.67, -53.509,
//   -52.64, -53.549,  -53.63, -53.729, -53.049, -54.429, -53.109,
//   -53.039,  -53.75, -54.689,  -53.46, -54.119, -52.549,  -53.39,
//   -53.659,  -53.17,  -50.02, -52.729, -52.939,   -52.7, -52.719,
//   -51.469,  -53.77, -54.369,  -52.32,  -53.27, -53.659,  -52.78,
//   -53.24, -53.009, -53.539,   -54.1, -53.039, -53.759,  -53.52,
//   -53.259, -53.909, -52.189,  -51.46, -52.719,  -53.57, -53.829,
//   -53.38, -53.979, -51.659,  -53.59, -53.399, -52.649, -52.729,
//   -53.259, -53.039,  -54.53,  -53.75, -54.109,   -53.1,  -51.28,
//   -54.89, -54.369,
//   ... 501 more items
// ],
//     time: 2019-01-17T15:30:08.000Z
// }

/* Setup MySQL connection */
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lpt',
});

// Form of data from DB is array of objects:
//  RowDataPacket {
//    trace_id: 50,
//    trace_data: ...
//    trace_time: 2019-01-17T15:30:08.000Z
// }

function parseTraceData(traceData) {
  const formattedTraceData = [];
  for (const trace of traceData) {
    const powerLevels = [];
    const buffer = Buffer.from(trace.trace_data);
    // Read trace_data 4 bytes at a time as signed 32-bit integers, stored in big-endian order,
    //  and then divide by 1000, and then save to new object for return from API
    let bufferOffset = 0;
    while (bufferOffset < buffer.length) {
      powerLevels.push(buffer.readInt32BE(bufferOffset) / 1000);
      bufferOffset += 4;
    }
    formattedTraceData.push({
      id: trace.trace_id,
      powerLevels,
      time: trace.trace_time,
    });
  }
  return formattedTraceData;
}

/* GET request for blob data. */
router.get('/', (req, res, next) => {
  // Select all rows from database, process, and send as JSON
  connection.query('SELECT * FROM test', (error, results, fields) => {
    if (error) {
      throw error;
    } else {
      const formattedTraceData = parseTraceData(results);
      res.json(formattedTraceData);
    }
  });
});

module.exports = router;
