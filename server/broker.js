const Topic = require('./topic');

module.exports = class Broker {
    topics = [];

    newTopic(name) {
        let existingTopic = false;
        
        this.topics.forEach(topic => {
            if(topic.name == name) {
                existingTopic = true;
            }
        });

        if(existingTopic === true) {
            return false;
        };

        const topic = new Topic(name);
        this.topics.push(topic);
        
        console.log('Topics:', this.topics);
        return topic;
    }

    getTopicsList() {
        return this.topics;
    }

    getTopicById(id) {
        const topic = this.topics.filter(topic => topic.subscriber == id);

        return topic[0];
    }

    getTopicByName(name) {
        const topic = this.topics.filter(topic => topic.name == name);

        return topic[0];
    }

}