// Agregar un nuevo alumno
const connection = require('../config/db');

const addAlumno = (req, res) => {
    const { nombre, telefono, direccion, correo, colegio, edad, grado } = req.body;
    if (!nombre || !telefono || !direccion || !correo || !colegio) {
      console.log('All fields are required');
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const query = 'INSERT INTO alunos (nome, email, endereco, telefone, edad, grado, escola_id) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [nombre, correo,direccion,telefono, edad, grado, colegio], (err, results) => {
      console.log(err);
      if (err) {
        console.error('Error adding data:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(201).json({ id: results.insertId, nombre, telefono, direccion, correo, colegio });
    });
  };
  
  // Eliminar multiples alumnos por ID
  const deleteAlumnos = (req, res) => {
    const { ids } = req.body;
  
    // Verificar que los IDs estén presentes y que sea un array
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'A list of IDs is required' });
    }
  
    const query = `DELETE FROM alunos WHERE id IN (${ids.map(() => '?').join(', ')})`;
  
    connection.query(query, ids, (err, results) => {
      if (err) {
        console.error('Error deleting data:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'No alumnos found with the provided IDs' });
      }
  
      res.status(204).send(); // Éxito: sin contenido
    });
  };
  
  // Editar un alumno por ID
  const editAlumno = (req, res) => {
    const { id } = req.params;
    const {  nombre, telefono, direccion, correo, colegio, edad, grado } = req.body;
  
    if (!nombre || !telefono || !direccion || !correo || !colegio) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const query = 'UPDATE alunos SET nome = ?, telefone = ?, endereco = ?, email = ?, escola_id = ?, edad = ?, gardo = ? WHERE id = ?';
  
    connection.query(query, [ nombre, telefono, direccion, correo, colegio, edad, grado, id], (err, results) => {
      if (err) {
        console.error('Error updating data:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Alumno not found' });
      }
      res.status(200).json({ id, nombre, telefono, direccion, correo, colegio });
    });
  };
  
  module.exports = {
    addAlumno,
    deleteAlumnos,
    editAlumno
  };