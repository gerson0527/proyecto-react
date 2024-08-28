// /models/role.js
const db = require('../config/db');

const Role = {
    create: (role_name) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO roles (role_name) VALUES (?)';
            db.query(query, [role_name], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },
    // Otras funciones CRUD para roles
};

module.exports = Role;
