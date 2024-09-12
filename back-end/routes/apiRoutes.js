const express = require('express');
const router = express.Router();
const connection = require('../config/db'); // Aseg�rate de tener una conexi�n a tu base de datos aqu�
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/students', (req, res) => {
    connection.query('SELECT COUNT(*) AS total FROM alunos', (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(results[0].total);
    });
});

router.get('/teachers', (req, res) => {
    connection.query('SELECT COUNT(*) AS total FROM professores', (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(results[0].total);
    });
});

router.get('/schools', (req, res) => {
    connection.query('SELECT COUNT(*) AS total FROM escolas', (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(results[0].total);
    });
});
router.get('/renda', (req, res) => {
    connection.query('SELECT SUM(TOTAL) AS total FROM renda', (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json( parseFloat(results[0].total));
    });
});

router.get('/renda/getRows', (req, res) => {
    connection.query('SELECT es.nome, r.total FROM `renda` r LEFT join escolas es ON es.id = r.escola_id', (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(results);
    });
});

router.get('/students/getNews', (req, res) => {
    connection.query('SELECT nome, email FROM Alunos WHERE data_criacao >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH);', (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(results);
    });
});


router.get('/alumnos/getRows', (req, res) => {
    connection.query('SELECT aln.id,aln.nome as nombre ,aln.telefone as telefono,aln.gardo as grado,aln.edad as edad,aln.email as correo,aln.endereco as direccion ,es.nome as colegio FROM `alunos` aln left join escolas es ON es.id = aln.escola_id order by aln.id DESC', (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(results);
    });
});
router.get('/escolas/getRows', (req, res) => {
    connection.query('SELECT * FROM `escolas`;', (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(results);
    });
});
router.post('/token', (req, res) => {
    const { token__refresh } = req.body;

    if (!token__refresh) return res.sendStatus(401);
  
    jwt.verify(token__refresh, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
  
      const accessToken = generateAccessToken({ id: user.id });
      res.json({ accessToken });
    });
}); 

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '1h', // 1h hora
  })
};
module.exports = router;
