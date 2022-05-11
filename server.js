/* CREATE A CONNECTION TO THE EXPRESS.JS SERVER TO HOST THE APPLICATION */
// ...import express
const express = require('express');
// ...2... import mySQL2 package
const mysql = require('mysql2');
// ...add PORT designation
const PORT = process.env.PORT || 3001;
// ...add app expression
const app = express();

// ...express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
// ...lastly, create a GET test route
/* app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
}); */

// THIS METHOD ALLOWS SQL commands to be written in a NODE.js app
// return all the data in the candidates table
db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});

// GET a single candidate
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(row);
    }
});

// Delete a candidate
db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(result);
    }
});

// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
    VALUES (?, ?, ?, ?)`;
const params = [1, 'Ronald', 'Firbank', 1];
db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(result);
    }
});

// Default response for any other request (Not Found)
// ...add a route to handle user requests that aren't supported by the app
// ...this route overwrites any route below it... make sure its at the bottom
app.use((req, res) => {
    res.status(404).end();
});

// ...function that will start the Express.js server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});