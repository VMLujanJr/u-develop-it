// **************
// IMPORT MODULES
// **************
const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// **********************
// CREATE - API Endpoints
// **********************
// ...wrap express.js around mySQL.
router.post('/voter', ({ body }, res) => {
    // Data validation // to prevent blank records from being created
    const errors = inputCheck(body, 'first_name', 'last_name', 'email');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    
    // POST a voter
    const sql = `INSERT INTO voters (first_name, last_name, email) VALUES (?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.email];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'successful',
            data: body
        })
    });
});

// **********************
// READ - API Endpoints
// **********************
// ...wrap express.js around mySQL.
router.get('/voters', (req, res) => {
    // GET voters
    const sql = `SELECT * FROM voters ORDER BY last_name`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'successful',
            data: rows
        });
    });
});

// ...wrap express.js around mySQL.
router.get('/voter/:id', (req, res) => {
    // GET a single voter
    const sql = `SELECT * FROM voters WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'succesful',
            data: row
        });
    });
});

// **********************
// UPDATE - API Endpoints
// **********************
// ...wrap express.js around mySQL.
router.put('/voter/:id', (req, res) => {
    // Data validation
    const errors = inputCheck(req.body, 'email');
    if (errors) {
        res.json(400).json({ error: errors });
        return;
    }

    // UPDATE voter information
    const sql = `UPDATE voters SET email = ? WHERE id = ?`;
    const params = [req.body.email, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        else if (!result.affectedRows) {
            res.json({
                message: 'Voter not found!'
            });
        }
        else {
            res.json({
                message: 'successful',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

// **********************
// DELETE - API Endpoints
// **********************
// ...wrap express.js around mySQL.
router.delete('/voter/:id', (req, res) => {
    const sql = `DELETE FROM voters WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        else if (!result.affectedRows) {
            res.json({
                message: 'Voter not found!'
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

module.exports = router;