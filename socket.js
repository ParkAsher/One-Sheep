const socketIo = require('socket.io');
const http = require('./app.js');

const io = socketIo(http);

io.on('connection', (sock) => {
    sock.on('postOrder', (data) => {
        console.log(data);
        const payload = {
            customerId: data.customerId,
            customerName: data.customerName,
            driverId: data.driverId,
            driverName: data.driverName,
        };
        io.emit('orderMessage', payload);
    });
});
