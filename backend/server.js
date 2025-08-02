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

// GET all data with headers
app.get('/api/data', (req, res) => {
  const { field, operator, value } = req.query;

  // Base query
  let sql = 'SELECT * FROM ElectricCars';
  let params = [];

  if (field && operator) {
    // Build filter condition based on operator
    let condition = '';
    switch (operator) {
      case 'contains':
        condition = `\`${field}\` LIKE ?`;
        params.push(`%${value}%`);
        break;
      case 'equals':
        condition = `\`${field}\` = ?`;
        params.push(value);
        break;
      case 'starts_with':
        condition = `\`${field}\` LIKE ?`;
        params.push(`${value}%`);
        break;
      case 'ends_with':
        condition = `\`${field}\` LIKE ?`;
        params.push(`%${value}`);
        break;
      case 'is_empty':
        condition = `(\`${field}\` IS NULL OR \`${field}\` = '')`;
        break;
      case 'greater_than':
        condition = `\`${field}\` > ?`;
        params.push(value);
        break;
      case 'less_than':
        condition = `\`${field}\` < ?`;
        params.push(value);
        break;
      default:
        return res.status(400).json({ error: 'Invalid operator' });
    }

    sql += ` WHERE ${condition}`;
  }

  connection.query(sql, params, (err, results, fields) => {
    if (err) {
      return res.status(500).send(err);
    }

    const headers = fields.map(field => field.name);

    res.json({
      headers,
      data: results,
    });
  });
});


// GET one row by ID
app.get('/api/data/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM ElectricCars WHERE id = ?', [id], (err, results, fields) => {
    if (err) {
      return res.status(500).send(err);
    }

    const headers = fields.map(field => field.name);

    res.json({
      headers,
      data: results[0]
    });
  });
});

// DELETE a row
app.delete('/api/data/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM ElectricCars WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ success: true });
  });
});



// Search in table
app.get('/api/search', (req, res) => {
  const searchTerm = req.query.q;
  const tableName = 'ElectricCars'; 

  if (!searchTerm) {
    return res.status(400).json({ error: 'Missing search query (?q=)' });
  }

  const likeSearch = `%${searchTerm}%`;

  const getColumnsQuery = `
    SELECT COLUMN_NAME, DATA_TYPE 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = ? AND TABLE_SCHEMA = DATABASE()
  `;

  connection.query(getColumnsQuery, [tableName], (err, columns) => {
    if (err) return res.status(500).json({ error: 'Error fetching column names', details: err });

    const searchableColumns = columns
      .filter(col => ['varchar', 'text', 'char'].includes(col.DATA_TYPE))
      .map(col => col.COLUMN_NAME);

    if (searchableColumns.length === 0) {
      return res.status(400).json({ error: 'No searchable columns found' });
    }

    const whereClause = searchableColumns.map(col => `\`${col}\` LIKE ?`).join(' OR ');
    const query = `SELECT * FROM \`${tableName}\` WHERE ${whereClause}`;
    const params = searchableColumns.map(() => likeSearch);

    connection.query(query, params, (err, results, fields) => {
      if (err) return res.status(500).json({ error: 'Error executing search', details: err });

      const headers = fields.map(field => field.name);

      res.json({
        headers,
        data: results
      });
    });
  });
});




// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




