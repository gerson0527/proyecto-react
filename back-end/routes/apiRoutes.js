const express = require('express');
const router = express.Router();
const connection = require('../config/db'); // Aseg�rate de tener una conexi�n a tu base de datos aqu�

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

module.exports = router;
