
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

sendGreeting = (socket) => {
    console.log(`Socket opened: ${socket.url}.`);

    socket.send(`Greetings from ${socket.url}.`);
}

subscribeTopic = (socket, name) => {
    let payload = {
        op: 'subscribe',
        topic: name,
        id: uuid,
        format: undefined
    };
    socket.send(JSON.stringify(payload));

    socket.on('message', msg => {
        console.log('Server:', JSON.parse(msg));
    });
}

consumeData = (socket, format='json') => {
    payload = {
        op: 'consume',
        topic: undefined,
        id: uuid,
        format
    };

    // Poll for messages
    consume = () => {
        socket.send(JSON.stringify(payload));
    };
    const consumerInterval = setInterval(consume, 500);

    // Handle data
    socket.on('message', msg => {
        const message = JSON.parse(msg);
        if(message.status === 'idle') {
            clearInterval(consumerInterval);
        }
    });
}

module.exports = { sendGreeting, subscribeTopic, consumeData }