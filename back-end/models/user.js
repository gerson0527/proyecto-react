// /models/user.js
const db = require('../config/db');

const User = {
    create: (username, email, password) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            db.query(query, [username, email, password], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },
    // Otras funciones CRUD para usuarios
};

module.exports = User;
