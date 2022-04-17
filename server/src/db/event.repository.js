const Event = require('../models/Event.js');

const save = async event => {
    await event.save().catch(err => { throw err });
};

const generateEvent = (type, fileName, user) => {
    return new Event({ type, fileName, user });
};

const find = async userId => {
    return await Event.find({ user: userId }, 'type fileName date').exec().catch(err => { throw err });
};

const remove = async event => {
    await event.remove().catch(err => { throw err });
};

const removeAll = async userId => {
    await Event.deleteMany({ user: userId});
};

module.exports = { save, generateEvent, find, remove, removeAll };
