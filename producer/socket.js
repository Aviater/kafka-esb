const WebSocket = require('ws');
const producer = require('./producer');

const socket = new WebSocket('ws://localhost:8080');

socket.on('open', () => {
    producer.sendGreeting(socket);

    producer.publishTopic(socket, 'humidity');

    producer.produceData(socket, 'humidity');
});


// Listen for acknowledgements
socket.on('message', msg => {
    console.log(`Server: ${msg}`);
});


// Close socket after 10s
setTimeout(() => {
    socket.close(1000);
    console.log(`Socket closed: ${socket.url}.`);
}, 10000);
