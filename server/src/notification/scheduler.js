const { schedule } = require('node-cron');
const NotificationRepository = require('../db/notification.repository.js');
const EventRepository = require('../db/event.repository.js');
const UserService = require('../services/user.services.js');
const EmailService = require('../services/email.services.js');

const notify = async (eventType, fileName, userId) => {
    try {
        const notification = await NotificationRepository.findOne(userId);
        if (notification.limit &&  notification.sended >= notification.limit) return;

        const dbEvent = EventRepository.generateEvent(eventType, fileName, userId);

        if (notification.frequency === 0) {
            await sendEmail(userId, [{
                type: dbEvent.type,
                fileName: dbEvent.fileName,
                date: dbEvent.date
            }]);

            await increaseSendedNotification(userId, notification); 
        } else {
            await EventRepository.save(dbEvent);
            const updatedNotification = await increaseEventsCount(userId, notification);

            if (updatedNotification.eventsCount === 10) {
                await sendNotify(userId);
                await increaseSendedNotification(userId, updatedNotification);            
            }
        }
    } catch (err) {
        console.error(err);
    }   
};

const startScheduler = userId => {
    const cronFrequency = '*/5 * * * *';

    const task = schedule(cronFrequency, async() => {
        try {
            const notification = await NotificationRepository.findOne(userId);

            if (notification.limit &&  notification.sended >= notification.limit) { 
                task.destroy();
            }
            await sendNotify(userId);
            await increaseSendedNotification(userId, notification);
        } catch (err) {
            console.error(err);
            task.destroy();
        }
    }, { scheduled: true });
};

const sendNotify = async(userId) => {
    try {
        const events = await EventRepository.find(userId);
        if (events.length === 0) return;

        await sendEmail(userId, events);

        for (const event of events) {
            await EventRepository.remove(event);
            await resetEventsCount(userId);
        }
    } catch (err) {
        console.error(err);
    }
};

const increaseSendedNotification = async (userId, notification) => {
    await NotificationRepository.update(userId, { sended: notification.sended + 1 });
};

const increaseEventsCount = async (userId, notification) => {
    const eventsCount = notification.eventsCount + 1;
    return await NotificationRepository.update(userId, { eventsCount });
};

const resetEventsCount = async userId => {
    return await NotificationRepository.update(userId, { eventsCount: 0 });
};

const sendEmail = async (userId, events) => {
    try {
        const user = await UserService.find(userId);

        await EmailService.sendEmail(user.email, events);
    } catch (err) {
        console.error(err);
    }
};

module.exports = { notify, startScheduler };
