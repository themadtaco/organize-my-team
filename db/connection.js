const mysql = require('mysql2');

// Connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //username
        user: 'root',
        password: 'maxdog48',
        database: 'company'
    },
    console.log('Connected to the election database.')
);

module.exports = db;