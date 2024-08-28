
require('dotenv').config();
const connection = require('../config/db');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password are required' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';

  connection.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Error connecting to the database' });
    }

    if (results.length > 0) {
      const user = results[0];

      if (password !== user.password) {
        return res.status(401).send({ message: 'Invalid password' });
      }
      const payload = { id: user.id, username: user.username, email: user.email }
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).send({ message: 'Login successful', token });
    } else {
      return res.status(401).send({ message: 'Invalid username or password' });
    }
  });
};

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ message: 'Username, email, and password are required' });
  }

  // Verifica si el usuario o el correo electrónico ya existen
  const checkQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';

  connection.query(checkQuery, [username, email], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Error connecting to the database' });
    }

    if (results.length > 0) {
      return res.status(400).send({ message: 'Username or email already exists' });
    }

    // Inserta el nuevo usuario
    const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

    connection.query(insertQuery, [username, email, password], (err, results) => {
      if (err) {
        return res.status(500).send({ message: 'Error inserting into the database' });
      }

      // Registro exitoso
      return res.status(201).send({ message: 'User registered successfully' });
    });
  });
};