const buildResponse = require('../helpers/buildResponse.js');
const exceptions = require('../exceptions/exceptions.js');

module.exports = (req, res, next) => {
    try {
        const { frequency, limit } = req.query;

        const parsedFrequency = parseInt(frequency);
        if (isNaN(parsedFrequency)) {
           return buildResponse(res, 401, { message: exceptions.INVALID_DATA });
        };

        if (limit !== '') {
            const parsedLimit = parseInt(limit);

            if (isNaN(parsedLimit)) {
                return buildResponse(res, 401, { message: exceptions.INVALID_DATA });
            };
            req.query.limit = parsedLimit;
        }
        req.query.frequency = parsedFrequency;
        next();
    } catch (err) {
        return buildResponse(res, 500, { message: exceptions.INTERNAL_SERVER_ERROR });
    }
};
