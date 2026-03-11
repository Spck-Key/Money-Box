const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // ကိုယ့် Database Username
    password: 'password', // ကိုယ့် Database Password
    database: 'moneybed3d'
});

connection.connect((err) => {
    if (err) {
        console.error('Database ချိတ်ဆက်မှု မအောင်မြင်ပါ - ' + err.stack);
        return;
    }
    console.log('Database ချိတ်ဆက်မှု အောင်မြင်ပါသည်');
});

module.exports = connection;
