// Agregar un nuevo alumno
const connection = require('../config/db');

const addAlumno = (req, res) => {
    const { nombre, telefono, direccion, correo, colegio } = req.body;
    if (!nombre || !telefono || !direccion || !correo || !colegio) {
      console.log('All fields are required');
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const query = 'INSERT INTO alunos (nome, email, endereco, telefone, escola_id) VALUES (?, ?, ?, ?, ?)';
    console.log(nombre, telefono, direccion, correo, colegio);
    connection.query(query, [nombre, correo,direccion,telefono, colegio], (err, results) => {
      console.log(err);
      if (err) {
        console.error('Error adding data:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(201).json({ id: results.insertId, nombre, telefono, direccion, correo, colegio });
    });
  };
  
  // Eliminar un alumno por ID
  const deleteAlumno = (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM alunos WHERE id = ?';
  
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error deleting data:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Alumno not found' });
      }
      res.status(204).send();
    });
  };
  
  // Editar un alumno por ID
  const editAlumno = (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, direccion, correo, colegio } = req.body;
  
    if (!nombre || !telefono || !direccion || !correo || !colegio) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const query = 'UPDATE alumnos SET nombre = ?, telefono = ?, direccion = ?, correo = ?, colegio = ? WHERE id = ?';
  
    connection.query(query, [nombre, telefono, direccion, correo, colegio, id], (err, results) => {
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
    deleteAlumno,
    editAlumno
  };