const Notification = require('../models/Notification.js');

const save = async userId => {
    const notification = new Notification({ user: userId });
    await notification.save().catch(err => { throw err });
};

const update = async(userId, updates) => {
    return await Notification.findOneAndUpdate({ user: userId }, updates, { new: true }).catch( err => { throw err });
};

const findOne = async userId => {
    return await Notification.findOne({ user: userId }).catch(err => { throw err });
};

const reset = async userId => {
    try {
        const notification = await findOne(userId);
        notification.sended = 0;
        notification.eventsCount = 0;
        await notification.save();
    } catch (err) {
        throw err;
    }
};

module.exports = { save, update, findOne, reset };
