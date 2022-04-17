const { model, Schema, ObjectId } = require('mongoose');

const Notification = new Schema({
    frequency: { type: Number, default: 0 },
    limit: { type: Number },
    sended: { type: Number, default: 0 },
    user: { type: ObjectId, ref: 'User' },
    eventsCount: { type: Number, default: 0 }
});

module.exports = model('Notification', Notification);
