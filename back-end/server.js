// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000; // Puedes elegir otro puerto

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint de autenticación
app.post('/', (req, res) => {
  const { username, password } = req.body;
  if (username === "123" && password === "123") {
    res.json({ success: true, message: 'Inicio de sesión exitoso!' });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
