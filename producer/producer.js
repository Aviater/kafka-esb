const { generateHumidity } = require('./humidityGenerator');
const { generateTemperature } = require('./temperatureGenerator');

sendGreeting = (socket) => {
    console.log(`Socket opened: ${socket.url}.`);

    socket.send(`Greetings from ${socket.url}.`);
}

publishTopic = (socket, name) => {
    let payload = {
        op: 'publish',
        topic: name,
        data: undefined
    };

    socket.send(JSON.stringify(payload));
}


produceData = (socket, topic) => {
    const payload = {
        op: 'produce',
        topic: topic,
        data: undefined
    };

    // Debug - Send random data
    let count = 0;
    while(count < 10) {
        payload.data = topic === 'humidity' ? generateHumidity() : generateTemperature();
        
        socket.send(JSON.stringify(payload));
        count++;
    }
}

module.exports = { sendGreeting, publishTopic, produceData };
