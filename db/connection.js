const mysql = require('mysql2');

// Connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //username
        user: 'root',
        password: '*****',
        database: 'company'
    },
    console.log('Connected to the company database.')
);

module.exports = db;
