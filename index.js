const express = require('express');
const pool = require('./config');
 
const app = express();
app.use(express.json());

const pate = 10000;
 
app.get('/', (req, res) => {
    res.send('Hello');
});
 
app.get('/api/treks', async (req, res) => {
  try {
    const treks = await pool.query(
        'SELECT * FROM treks;'
    );
    res.json({ treks });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message)
  }
});
 
app.post('/api/treks', (req, res) => {
  res.status(201).send('Sent the new data to the DB ...')
});
 
app.listen(pate, () => {
    console.log("Server running on port", pate);
});