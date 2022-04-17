const File = require('../models/File.js');

const find = async (userId) => {
    return await File.find({ user: userId }).exec().catch(err => { throw err });
};

const save = async (file, type, userId) => {
    const dbFile = new File({
        name: file.name,
        type: type,
        size: file.size,
        path: file.name,
        user: userId
    });
    
    await dbFile.save().catch(err => { throw err });
    return dbFile;
};

const findOne = async (fileId, userId) => {
    return await File.findOne({ _id: fileId, user: userId }).catch(err => { throw err });
};

const remove = async (file) => {
    await file.remove().catch(err => { throw err });
};

module.exports = { find, save, findOne, remove };
