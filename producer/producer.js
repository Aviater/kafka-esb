const WebSocket = require('ws');
const { generateHumidityXML } = require('./xmlGenerator');

const socket = new WebSocket('ws://localhost:8080');

socket.on('open', () => {
    console.log(`Socket opened: ${socket.url}.`);

    // Send greeting
    socket.send(`Greetings from ${socket.url}.`);

    // Publish topic
    let payload = {
        op: 'publish',
        topic: 'humidity',
        data: undefined
    };
    socket.send(JSON.stringify(payload));

    // Debug - Send random data every second
    let count = 0;
    while(count < 10) {
        socket.send(JSON.stringify(generateHumidityXML()));
        count++;
    }
    
});


// Listen for acknowledgements
socket.on('message', msg => {
    console.log(`Server: ${msg}`);
})


setTimeout(() => {
    socket.close(1000);
    console.log(`Socket closed: ${socket.url}.`);
}, 10000);

