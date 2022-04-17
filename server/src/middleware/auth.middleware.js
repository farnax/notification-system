const jwt = require('jsonwebtoken');

const buildResponse = require('../helpers/buildResponse.js');
const exceptions = require('../exceptions/exceptions.js');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
       return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return buildResponse(res, 401, { message: exceptions.AUTHENTICATION_ERROR });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return buildResponse(res, 500, { message: exceptions.INTERNAL_SERVER_ERROR });
    }
};
