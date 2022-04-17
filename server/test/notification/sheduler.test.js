const { notify } = require('../../src/notification/scheduler.js');
const NotificationRepository = require('../../src/db/notification.repository.js');
const EventRepository = require('../../src/db/event.repository.js');
const UserService = require('../../src/services/user.services.js');
const EmailService = require('../../src/services/email.services.js')

jest.mock('../../src/db/notification.repository.js');
jest.mock('../../src/db/event.repository.js');
jest.mock('../../src/services/user.services.js');
jest.mock('../../src/services/email.services.js');


describe('Scheduler', () => {
    const mockEventType = 'test_type';
    const mockFileName = 'test_fileName';
    const mockUserId = 'test_userId';
    const mockDate = Date.now();
    const mockEmail = 'test_email';

    const mockDbEvent = {
        type: mockEventType,
        fileName: mockFileName,
        date: mockDate
    };

    beforeEach(() => {
        EventRepository.generateEvent.mockReturnValue(mockDbEvent);
        UserService.find.mockResolvedValue({ email: mockEmail });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('sends event immediately without saving to db when frequency = 0', async() => {
        const mockNotification = {
            sended: 0,
            frequency: 0
        };
        NotificationRepository.findOne.mockResolvedValue(mockNotification);

        await notify(mockEventType, mockFileName, mockUserId);
        
        expect(EmailService.sendEmail).toHaveBeenCalledWith(mockEmail, [{
            type: mockEventType,
            fileName: mockFileName,
            date: mockDate
        }]);
        expect(EventRepository.save).not.toHaveBeenCalled();
    });

    it('saves event to db without sanding when frequency = 5 and events count less than 10', async() => {
        const mockNotification = {
            sended: 2,
            frequency: 5,
            eventsCount: 0
        };
        NotificationRepository.findOne.mockResolvedValue(mockNotification);

        await notify(mockEventType, mockFileName, mockUserId);

        expect(EventRepository.save).toHaveBeenCalled();
        expect(EmailService.sendEmail).not.toHaveBeenCalled();
    });

    it('saves event to db and sends when frequency = 5 and events count = 10', async() => {
        const mockNotification = {
            sended: 2,
            frequency: 5,
            eventsCount: 9
        };
        const mockUpdatedNotification = {...mockNotification, 
            eventsCount: mockNotification.eventsCount +1};
        NotificationRepository.findOne.mockResolvedValue(mockNotification);
        NotificationRepository.update.mockResolvedValue(mockUpdatedNotification);
        EventRepository.find.mockResolvedValue([mockDbEvent]);

        await notify(mockEventType, mockFileName, mockUserId);

        expect(EventRepository.save).toHaveBeenCalled();
        expect(EmailService.sendEmail).toHaveBeenCalled();
    });

    it('passes without processing when limit is reached', async() => {
        const mockNotification = {
            sended: 2,
            frequency: 0,
            limit: 2
        };
        NotificationRepository.findOne.mockResolvedValue(mockNotification);

        await notify(mockEventType, mockFileName, mockUserId);

        expect(EventRepository.save).not.toHaveBeenCalled();
        expect(EmailService.sendEmail).not.toHaveBeenCalled();
    });
});
