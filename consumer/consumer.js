const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:8080');

socket.on('open', () => {
    console.log(`Socket opened: ${socket.url}.`);

    // Send greeting
    socket.send(`Greetings from ${socket.url}.`);

    // Consume from topic
    let payload = {
        op: 'consume',
        topic: 'humidity',
    }

    // Debug
    consume = () => {
        socket.send(JSON.stringify(payload));
    };
    const consumerInterval = setInterval(consume, 500);

    socket.on('message', msg => {
        if(message.status === 'idle') {
            clearInterval(consumerInterval);
        };

        const message = JSON.parse(msg);
        console.log(`${message.topic} data recieved: ${JSON.stringify(message.data)}`);
    });
    
});