const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin_routes');
const socketManager = require('./core/socket_manager');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Admin API လမ်းကြောင်းများ (ယူနစ်ဖြည့်/အကောင့်ဖွင့်)
app.use('/admin', adminRoutes);

// Socket.io ကို စတင်အသုံးပြုခြင်း
socketManager(io);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`MoneyBed 3D Server running on port ${PORT}`);
});
