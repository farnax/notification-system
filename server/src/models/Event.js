const { model, Schema, ObjectId } = require('mongoose');

const Event = new Schema({
    type: { type: String, required: true },
    fileName: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    user: { type: ObjectId, ref: 'User' }
})

module.exports = model('Event', Event);
