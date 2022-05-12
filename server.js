/* CREATE A CONNECTION TO THE EXPRESS.JS SERVER TO HOST THE APPLICATION */
// ...import express
const express = require('express');
const res = require('express/lib/response');
// ...2... import mySQL2 package
const mysql = require('mysql2');
// ...add PORT designation
const PORT = process.env.PORT || 3001;
const inputCheck = require('./utils/inputCheck.js');
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

// Get all candidates
app.get('/api/candidates', (req, res) => {
    // THIS METHOD ALLOWS SQL commands to be written in a NODE.js app
    // return all the data in the candidates table
    const sql = `SELECT candidates.*, parties.name
        AS party_name
        FROM candidates
        LEFT JOIN parties
        ON candidates.party_id = parties.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});


app.get('/api/candidate/:id', (req, res) => {
    // GET a single candidate
    const sql = `SELECT candidates.*, parties.name
        AS party_name
        FROM candidates
        LEFT JOIN parties
        ON candidates.party_id = parties.id
        WHERE candidates.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

app.delete('/api/candidate/:id', (req, res) => {
    // Delete a candidate
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            err.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        }
        else {
            res.json({
                message: 'successfully deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// ...wrap express.js around mySQL.
app.post('/api/candidate', ({ body }, res) => {
    // Create a candidate
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];
    
    db.query(sql, params, (err, result) => {
        if (err) {
            err.status(400).json({ error: err.message });
            return
        }
        res.json({
            message: 'success',
            data: body
        })
    });
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