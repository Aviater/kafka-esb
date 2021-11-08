
module.exports = class Topic {
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

        if(this.index === this.messages.length - 1){
            output.status = 'idle';
        } else {
            output.status = 'ok';
            output.data = this.messages[this.index];
            this.index++;
        }

        return output;
    }

    getAllMessages() {
        return this.messages;
    }
}