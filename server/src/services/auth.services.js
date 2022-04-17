
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../helpers/errorHandling.js');
const exceptions = require('../exceptions/exceptions.js');
const FileService = require('./file.services.js');
const AuthRepository = require('../db/auth.repository.js');
const notification = require('../notification');
const NotificationService = require('../services/notification.services.js');

const getTokenAndUser = (user) => {
    const token = jwt.sign({ id: user.id}, process.env.SECRET_KEY, { expiresIn: '2h' });

    return { token, user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
    }};
};

const register = async (email, password) => {
    try {
        const candidate = await AuthRepository.findOne(email);
        if (candidate) {
           throw new ErrorHandler(400, exceptions.USER_ALREADY_EXISTS);
        }
    
        const hashPassword = await bcrypt.hash(password, 8);
        const user = await AuthRepository.save(email, hashPassword);

        FileService.createDir(user.id);
        
        await NotificationService.setInitialNotificationOptions(user._id);
    } catch (err) {
        throw err;
    }
};

const authorize = async (email, password) => {
    try {
        const user = await AuthRepository.findOne(email);
        if (!user) {
            throw new ErrorHandler(404, exceptions.USER_NOT_FOUND);
        }

        const isPassValid = bcrypt.compareSync(password, user.password);
        if (!isPassValid) {
            throw new ErrorHandler(400, exceptions.INVALID_PASSWORD);
        }

        await NotificationService.resetNotification(user._id);
        notification.subscribe(user._id);

        return getTokenAndUser(user);
    } catch (err) {
        throw err;
    }
};

const authenticate = async (userId) => {
    try {
        const user = await AuthRepository.findById(userId);
        return getTokenAndUser(user);
    } catch (err) {
        throw err;
    }
};

module.exports = { register, authorize, authenticate };
