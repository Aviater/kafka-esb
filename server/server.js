const WebSocket = require('ws');
const Broker = require('./broker');
const { xmlToJson } = require('./transform');

const broker = new Broker();

const server = new WebSocket.Server({ port: '8080' }, () => {
    console.log(`Server running on ${server.options.port}...`)
});


server.on('connection', socket => {

    socket.on('message', payload => {
        var msg = payload;
        try {
            msg = JSON.parse(payload);
        } catch(e){}

        let topic;
        switch(msg.op) {
            case 'publish':
                topic = broker.newTopic(msg.topic);
                if (topic.status === 'ok') {
                    console.log(`New topic: ${topic.data.name}`);
                    socket.send(`${topic.data.name} topic created.`);
                } else {
                    socket.send('Topic already exists.');
                }
                break;
            case 'produce':
                topic = broker.getTopic(msg.topic);
                topic.messages.push(xmlToJson(msg.data));
                console.log(topic.messages);
                socket.send(`${msg.topic} message added to queue.`);
                break;
            case 'consume':
                topic = broker.getTopic(msg.topic);
                const payload = topic.getHeadMessage();
                
                socket.send(JSON.stringify(payload));
            default:
                console.log(`New message: ${msg}`);
        }
    });

    socket.on('close', code => {
        console.log(`Producer disconnected. \n Code: ${code}`);
    });

});
