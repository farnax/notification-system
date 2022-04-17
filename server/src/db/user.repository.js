const User = require('../models/User.js');

const findOne = async (userId) => {
    return await User.findOne({ _id: userId }).catch(err => { throw err });;
};

const save = async (user) => {
    await user.save();
}

module.exports = { findOne, save };
