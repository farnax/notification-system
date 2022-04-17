const User = require('../models/User.js');

const findOne = async(email) => {
    return await User.findOne({ email }).catch(err => { throw err });
};

const save = async(email, password) => {
    const user = new User({ email, password });
    await user.save().catch(err => { throw err });
    return user;
};

const findById = async(userId) => {
    return await User.findOne({ _id: userId }).catch(err => { throw err });
};

module.exports = { findOne, save, findById };
