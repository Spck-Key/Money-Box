const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const crypto = require('crypto');

// AI ID ထုတ်ပေးသည့် Function
function generateUniqueID() {
    const timestamp = Date.now().toString().slice(-4);
    const randomStr = crypto.randomBytes(2).toString('hex').toUpperCase();
    return `MB-${timestamp}-${randomStr}`;
}

// ယူနစ် ဖြည့်/နှုတ် API
router.post('/manage-unit', (req, res) => {
    const { phone, amount, action } = req.body;
    let operator = action === 'add' ? '+' : '-';
    const query = `UPDATE users SET balance = balance ${operator} ? WHERE phone = ? OR user_id = ?`;
    
    db.query(query, [amount, phone, phone], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        db.query('INSERT INTO transactions (target_user, amount, type) VALUES (?, ?, ?)', [phone, amount, action]);
        res.json({ message: "Success" });
    });
});

// အကောင့်သစ်ဖွင့်ပေးခြင်း API
router.post('/create-account', (req, res) => {
    const { name, phone } = req.body;
    const newID = generateUniqueID();
    const query = 'INSERT INTO users (user_id, name, phone, balance, role) VALUES (?, ?, ?, 0, "player")';
    
    db.query(query, [newID, name, phone], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: newID, message: "Account Created" });
    });
});

module.exports = router;
