const connection = require('../config/db');

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
      console.log(results);

      if (password !== user.password) {
        return res.status(401).send({ message: 'Invalid password' });
      }

      // If the password matches, generate a token or start a session
      return res.status(200).send({ message: 'Login successful' });
    } else {
      return res.status(401).send({ message: 'Invalid username or password' });
    }
  });
};