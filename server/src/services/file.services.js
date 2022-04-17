const path = require('path');
const fs = require('fs');
const { ErrorHandler } = require('../helpers/errorHandling.js');
const exceptions = require('../exceptions/exceptions.js');
const UserService  = require('./user.services.js');
const FileRepository = require('../db/file.repository.js');
const notification = require('../notification');
const eventTypes = require('../notification/events.js');

const FILES_PATH = process.env.FILES_DIR || 'files';

const findFilePath = (userId, name) => {
    return path.join(FILES_PATH, userId, name);
};

const getAll = async (userId) => {
    try {
        return await FileRepository.find(userId);
    } catch (err) {
        throw err;
    }
};

const upload = async (file, userId) => {
    try {
        await UserService.changeUserDiscSpace(userId, file.size);
       
        const filePath = findFilePath(userId, file.name);
        const exists = fs.existsSync(filePath);
        if (exists) throw new ErrorHandler(400, exceptions.FILE_ALREADY_EXISTS);
        
        file.mv(filePath);

        const type = path.extname(file.name);

        notification.notify(eventTypes.UPLOAD, file.name);

        return await FileRepository.save(file, type, userId);
    } catch (err) {
        throw err;
    }
};

const createDir = (userId) => {
    const folderPath = path.join(FILES_PATH, userId);
    const exists = fs.existsSync(folderPath);
    if (exists) return;

    fs.mkdirSync(folderPath);
};

const download = async (fileId, userId) => {
    try {
        const file = await FileRepository.findOne(fileId, userId);
        if (!file) throw new ErrorHandler(400, exceptions.FILE_NOT_EXISTS);

        const filePath = findFilePath(userId, file.name);
        const exists = fs.existsSync(filePath);
        
        if(!exists) throw new ErrorHandler(400, exceptions.FILE_NOT_EXISTS);

        notification.notify(eventTypes.DOWNLOAD, file.name);
        return filePath;
    } catch (err) {
        throw err;
    }
};

const remove = async (fileId, userId) => {
    try {
        const file = await FileRepository.findOne(fileId, userId);
        if(!file) throw new ErrorHandler(400, exceptions.FILE_NOT_EXISTS);

        const filePath = findFilePath(userId, file.name);
        fs.unlinkSync(filePath);

        await FileRepository.remove(file);
        notification.notify(eventTypes.REMOVE, file.name);
    } catch (err) {
        throw err;
    }
};

module.exports = { getAll, upload, createDir, download, remove };
