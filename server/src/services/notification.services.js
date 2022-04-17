const NotificationRepository = require('../db/notification.repository.js');
const EventRepository = require('../db/event.repository.js');

const getOptions = async userId => {
    const result = await NotificationRepository.findOne(userId).catch(err => { throw err });
    return { options: { frequency: result.frequency, limit: result.limit ?? '' }}
};

const setOptions = async(userId, frequency, limit) => {
    try {
        let updates;
        if (limit === '') updates = { frequency, limit: null, sended: 0 };
        else updates = { frequency, limit, sended: 0 };
        
        const updated = await NotificationRepository.update(userId, updates);
        await resetNotification(userId);

        return { options: { frequency: updated.frequency, limit: updated?.limit }};
    } catch(err) {
        throw err;
    }
};

const setInitialNotificationOptions = async userId => {
    await NotificationRepository.save(userId).catch(err => { throw err });
};

const resetNotification = async userId => {
    try {
        await NotificationRepository.reset(userId);
        await EventRepository.removeAll(userId);
    } catch (err) {
        throw err;
    }
};


module.exports = { setOptions, getOptions, setInitialNotificationOptions, resetNotification };

