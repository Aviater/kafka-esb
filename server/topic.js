
module.exports = class Topic {
    subscriber;
    messages = [];
    index = 0;

    constructor(name) {
        this.name = name;
    }

    getHeadMessage() {
        const output = {
            topic: this.name,
            status: undefined,
            data: undefined
        };

        if(this.index === this.messages.length){
            output.status = 'idle';
        } else {
            output.status = 'ok';
            output.data = this.messages[this.index];
            this.index++;
        }

        console.log('Sending:', output)
        return output;
    }

    getAllMessages() {
        return this.messages;
    }
}