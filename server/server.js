const WebSocket = require('ws');
const Broker = require('./broker');

const { publish, produce, subscribe, consume } = require('./broker.layer');

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

        switch(msg.op) {
            case 'publish':
                publish(broker, socket, msg);
                break;
            case 'produce':
                produce(broker, socket, msg);
                break;
            case 'subscribe':
                // }
                subscribe(broker, socket, msg);
                break;
            case 'consume':
                consume(broker, socket, msg);
                break;
            default:
                console.log(`New message: ${msg}`);
        }
    });

    socket.on('close', code => {
        console.log(`Producer disconnected. \n Code: ${code}`);
    });

});
