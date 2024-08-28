const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/authRoutes');

const cors = require('cors');
app.use(cors());
app.use(express.json()); // Manejar JSON en las peticiones

// Definir las rutas
app.use(bodyParser.json());
app.use('/', authRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
