const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware'); 
const alumnoController = require('../controllers/alumnoController');

// Autenticar un usuario (protegido)
router.post('/', authController.login);
// Registar un usuario (protegido)
router.post('/register', authController.register);
// Agregar un nuevo alumno (protegido)
router.post('/alumnos', authenticateToken, alumnoController.addAlumno);
// Editar un alumno por ID (protegido)
router.put('/alumnos/:id', authenticateToken, alumnoController.editAlumno);
// Eliminar un alumno por ID (protegido)
router.delete('/alumnos/:id', authenticateToken, alumnoController.deleteAlumno);



module.exports = router;
