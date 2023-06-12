const express = require('express');
const cors = require('cors');
const pool = require('./config');

const app = express();
app.use(express.json());
// sdgfds
app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
    res.send('Simple API homepage');
});

app.get('/api/treks', async (req, res) => {
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

app.listen(10000, () => {
    console.log("Server running on port 10000");
});