const express = require('express');
const router = express.Router();
const db = require('../../db/connection.js');
const inputCheck = require('../../utils/inputCheck.js');


// **********************
// CREATE - API Endpoints
// **********************
// ...wrap express.js around mySQL.
router.post('/candidate', ({ body }, res) => {
    // CREATE a candidate
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

// **********************
// READ - API Endpoints
// **********************
// ...wrap express.js around mySQL.
router.get('/candidates', (req, res) => {
    // GET all candidates
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

// ...wrap express.js around mySQL.
router.get('/candidate/:id', (req, res) => {
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

// **********************
// UPDATE - API Endpoints
// **********************
// ...wrap express.js around mySQL.
router.put('/candidate/:id', (req, res) => {
    // using inputCheck function
    const errors = inputCheck(req.body, 'party_id');
    
    if (errors) {
        res.status(400).json({ error: errors});
        return;
    }
    
    // UPDATE a candidate's party
    const sql = `UPDATE candidates SET party_id = ?
        WHERE id = ?`;
    const params = [req.body.party_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        // check if record was found
        else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found.'
            });
        }
        else {
            res.json({
                message: 'successfully updated',
                data: req.body,
                changes: result.affectedRows
            })
        }
    });
});

// **********************
// DELETE - API Endpoints
// **********************
// ...wrap express.js around mySQL.
router.delete('/candidate/:id', (req, res) => {
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

module.exports = router;