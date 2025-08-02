const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cars',
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// GET all data
app.get('/api/data', (req, res) => {
  connection.query('SELECT * FROM ElectricCars', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// GET one row by ID
app.get('/api/data/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM ElectricCars WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
});

// DELETE a row
app.delete('/api/data/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM your_table WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ success: true });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
