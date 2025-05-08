const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'YOUR_DB_PASS',
    database: 'YOUR_DB_NAME'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Generic CRUD routes
const tables = {
    Users: ['user_id', 'first_name', 'last_name', 'email', 'password', 'role', 'phone', 'created_at'],
    Members: ['member_id', 'user_id', 'membership_id', 'membership_start_date', 'membership_end_date', 'emergency_contact', 'fitness_goals'],
    Memberships: ['membership_id', 'type', 'duration', 'price'],
    Attendance: ['attendance_id', 'member_id', 'check_in', 'check_out', 'duration_minutes'],
    Equipment: ['equipment_id', 'name', 'type', 'purchase_date', 'last_maintenance', 'status'],
    Payments: ['payment_id', 'member_id', 'amount', 'payment_date', 'method', 'status', 'invoice_number'],
    Trainers: ['trainer_id', 'user_id', 'specialty', 'certification', 'years_experience', 'available_days'],
    Workout_Sessions: ['session_id', 'trainer_id', 'title', 'description', 'session_date', 'start_time', 'end_time', 'max_participants'],
    Session_Participants: ['participant_id', 'session_id', 'member_id', 'attendance_status'],
    Trainer_Assignments: ['assignment_id', 'trainer_id', 'member_id', 'start_date', 'end_date', 'session_type', 'notes']
};

Object.keys(tables).forEach(table => {
    const fields = tables[table];
    const idField = fields[0];

    // Get all
    app.get(`/api/${table.toLowerCase()}`, (req, res) => {
        db.query(`SELECT * FROM ${table}`, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    });

    // Get one
    app.get(`/api/${table.toLowerCase()}/:id`, (req, res) => {
        db.query(`SELECT * FROM ${table} WHERE ${idField} = ?`, [req.params.id], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results[0]);
        });
    });

    // Create
    app.post(`/api/${table.toLowerCase()}`, (req, res) => {
        const values = fields.slice(1).map(field => req.body[field]);
        const placeholders = fields.slice(1).map(() => '?').join(',');
        db.query(`INSERT INTO ${table} (${fields.slice(1).join(',')}) VALUES (${placeholders})`, values, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: results.insertId });
        });
    });

    // Update
    app.put(`/api/${table.toLowerCase()}/:id`, (req, res) => {
        const updates = fields.slice(1).map(field => `${field} = ?`).join(',');
        const values = fields.slice(1).map(field => req.body[field]).concat(req.params.id);
        db.query(`UPDATE ${table} SET ${updates} WHERE ${idField} = ?`, values, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true });
        });
    });

    // Delete
    app.delete(`/api/${table.toLowerCase()}/:id`, (req, res) => {
        db.query(`DELETE FROM ${table} WHERE ${idField} = ?`, [req.params.id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true });
        });
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
