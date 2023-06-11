const express = require('express');
const pool = require('./config');
var cors = require('cors')

const app = express();
const port = 3000;

// app.use(cors({
//   origin: '*'
// }));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello');
});
 
// var express = require('express')

var corsOptions = {
  origin: 'https://andrease-matkad-app.onrender.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/api/treks', cors(corsOptions), async (req, res, next) => {
  const rows = await pool.query(
    'SELECT * FROM treks;'
);
  res.json(rows)
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port')
})

app.get('/api/treks', async (req, res) => {
  try {
    const rows = await pool.query(
        'SELECT * FROM treks;'
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message)
  }
});
 
app.post('/api/treks', (req, res) => {
  res.status(201).send('Sent the new data to the DB ...')
});
 
app.listen(port, () => {
    console.log("Server running on port", port);
});