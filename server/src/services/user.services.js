const UserRepository = require('../db/user.repository.js');
const { ErrorHandler } = require('../helpers/errorHandling.js');

const changeUserDiscSpace = async (userId, dataSize) => {
    const user = await find(userId);

    if (user.usedSpace + dataSize > user.diskSpace) {
        return new ErrorHandler(400, exceptions.NOT_ENOUGH_SPACE);
    }

    user.usedSpace = user.usedSpace + dataSize;
    
    await UserRepository.save(user);
};

const find = async (userId) => {
    return await UserRepository.findOne({ _id: userId });
};

module.exports = { changeUserDiscSpace, find };
