const NotificationService = require('../services/notification.services.js');
const buildResponse = require('../helpers/buildResponse.js');
const exceptions = require('../exceptions/exceptions.js');

const getOptions = async(req, res) => {
    try {
        const options = await NotificationService.getOptions(req.user.id);
        return buildResponse(res, 200, options);
    } catch (err) {
        console.error(err);
        return buildResponse(res, 500, { message: exceptions.CAN_NOT_GET_OPTIONS }); 
    }
};

const setOptions = async(req, res) => {
    try {
        const { frequency, limit } = req.query;
        const options = await NotificationService.setOptions(req.user.id, frequency, limit);
        return buildResponse(res, 200, options);
    } catch (err) {
        console.error(err);
        return buildResponse(res, 500, { message: exceptions.CAN_NOT_SET_OPTIONS }); 
    }
};

module.exports = {getOptions, setOptions}