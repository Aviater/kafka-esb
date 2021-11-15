const { xmlToJson, jsonToXml, jsonToCsv } = require('./transform');

const response = {
    op: undefined,
    topic: undefined,
    status: undefined,
    format: undefined,
    data: undefined
};

publish = (broker, socket, msg) => {
    response.op = msg.op;
    response.topic = msg.topic;
    topic = broker.newTopic(msg.topic);
    // console.log('Topic:', topic)
    if (topic) {
        response.status = 'ok';
        response.data = `${topic.name} topic created.`;

        console.log(`New topic: ${topic.name}`);
        socket.send(JSON.stringify(response));
    } else {
        response.status = 'error';
        response.data = `${msg.topic} topic already exists.`;
        socket.send(JSON.stringify(response));
    }
};

produce = (broker, socket, msg) => {
    topic = broker.getTopicByName(msg.topic);
    
    topic.messages.push(msg.data);
    response.op = msg.op;
    response.topic = msg.topic;
    response.status = 'ok';
    response.data = `${msg.topic} message added to queue.`;

    console.log(topic.messages);
    socket.send(JSON.stringify(response));
};

subscribe = (broker, socket, msg) => {
    topic = broker.getTopicByName(msg.topic);
    response.op = msg.op;
    response.topic = msg.topic;

    if(topic.subscriber) {
        if(topic.subscriber === msg.id) {
            response.status = 'error';
            response.data = `This consumer is already a subscriber to ${msg.topic}.`;

            socket.send(JSON.stringify(response));
        } else {
            response.status = 'error';
            response.data = `${msg.topic} topic already has a subscriber.`;

            socket.send(JSON.stringify(response));
        }
    } else {
        topic.subscriber = msg.id;
        response.status = 'ok';
        response.data = `Subscribed to topic ${msg.topic}.`;

        console.log('New subscriber:', topic.subscriber);
        socket.send(JSON.stringify(response));
    }
};

consume = (broker, socket, msg) => {
    topic = broker.getTopicById(msg.id);
    response.op = msg.op;
    response.topic = topic.name;

    // Check if the topic is published.
    if(!topic) {
        response.status = 'error';
        response.data = `${msg.topic} topic doesn't exist.`;

        socket.send(JSON.stringify(response));
        return;
    }

    const topicMessage = topic.getHeadMessage();
    response.status = topicMessage.status;
    if(response.status === 'ok') {
        switch(msg.format) {
            case 'xml':
                response.data = jsonToXml(topicMessage.data);
                break;
            case 'csv':
                response.data = jsonToCsv(topicMessage.data);
                break;
            default:
                response.data = topicMessage.data;
        };
    };
    
    socket.send(JSON.stringify(response));
};

module.exports = { publish, produce, subscribe, consume };