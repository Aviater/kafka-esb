const WebSocket = require('ws');
const consumer = require('./consumer');

const socket = new WebSocket('ws://localhost:8080');

socket.on('open', () => {
    consumer.sendGreeting(socket);

    consumer.subscribeTopic(socket, 'humidity');

    consumer.consumeData(socket);   // Default is json.
});
