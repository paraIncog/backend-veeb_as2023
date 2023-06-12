const express = require('express');
const pool = require('./config');
var cors = require('cors')

const app = express();
const port = 3030;
app.use(express.json());

app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  res.send('Simple API homepage');
});

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}


app.get('/api/treks', cors(corsOptions), async (req, res, next) => {
  try {
    const { rows } = await pool.query(
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
  console.log('CORS-enabled web server listening on port')
})