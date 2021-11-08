const Topic = require('./topic');

module.exports = class Broker {
    topics = [];

    newTopic(name) {
        let output = {
            status: undefined,
            data: undefined
        };

        this.topics.forEach(topic => {
            if(topic.name == name) {
                output = {
                    status: 'error',
                    data: undefined
                }
            }
        });

        if(output.status === 'error') {
            return output;
        }

        const topic = new Topic(name);
        output = {
            status: 'ok',
            data: topic
        };
        this.topics.push(topic);
        
        console.log('Topics:', this.topics)
        return output;
    }

    getTopicsList() {
        return this.topics;
    }

    getTopic(name) {
        const topic = this.topics.filter(topic => topic.name == name);

        return topic[0];
    }
}