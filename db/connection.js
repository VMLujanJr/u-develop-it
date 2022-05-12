// ...2... import mySQL2 package
const mysql = require('mysql2');

// ...2... connect application to mySQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // mySQL username
        user: 'root',
        // mySQL password
        password: 'ohmyglob1994',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

module.exports = db;