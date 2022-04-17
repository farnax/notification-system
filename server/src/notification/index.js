const EventEmitter = require('events');
const eventTypes = require('./events.js');
const scheduler = require('./scheduler.js');

class Notification  {
    #emitter = null;
    #userId = null;

    constructor() {
        this.#emitter = new EventEmitter();
    }

    get userId() {
        return this.#userId;
    }

    set userId(id) {
        this.#userId = id;
    }

    subscribe(id) {
        this.userId = id;

        scheduler.startScheduler(this.userId);

        for (const event of Object.values(eventTypes)) {
            this.clearListeners(event);

            console.log(`User ${this.userId} was subscribed on ${event} event`);

            this.#emitter.on(event, async (fileName) => {
                console.log(`${event} was emitted on ${fileName}`);
                await scheduler.notify(event, fileName, this.userId);
            });
        }
    }

    notify(type, fileName) {
        this.#emitter.emit(type, fileName);
    }

    clearListeners(event) {
        this.#emitter.removeAllListeners(event);
    }
}

module.exports = new Notification();
