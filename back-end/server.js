const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Configuración middleware
app.use(cors({ origin:'http://localhost:5173',methods: ['GET', 'POST', 'PUT', 'DELETE']})); // Habilitar CORS
app.use(bodyParser.json()); // Manejar JSON en las peticiones
app.use(express.json());

// Usar las rutas
app.use('/api', apiRoutes); // Prefijo '/api' para rutas de API
app.use('/', authRoutes); // Rutas de autenticación

// Iniciar el servidor
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
