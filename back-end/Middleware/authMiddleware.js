const jwt = require('jsonwebtoken');

// Middleware para verificar el JWT
const authenticateToken = (req, res, next) => {
  console.log('Authenticating token...');
  console.log(req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ error: 'Token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
