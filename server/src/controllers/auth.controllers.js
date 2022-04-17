const { validationResult } = require('express-validator');
const AuthService = require('../services/auth.services.js');
const { ErrorHandler, handleError } = require('../helpers/errorHandling.js');
const buildResponse = require('../helpers/buildResponse.js');
const exceptions = require('../exceptions/exceptions.js');

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return buildResponse(res, 400, { message: 'Incorrect request', errors });
        }

        const { email, password } = req.body;

        await AuthService.register(email, password);

        return buildResponse(res, 201, { message: 'User was created' });
    } catch (err) {
        console.error(err);
        if (err instanceof ErrorHandler) return handleError(err, res);
        return buildResponse(res, 500, { message: exceptions.INTERNAL_SERVER_ERROR });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { token, user } = await AuthService.authorize(email, password);

        return buildResponse(res, 200, { token, user });
    } catch (err) {
        console.error(err);
        if (err instanceof ErrorHandler) return handleError(err, res);
        return buildResponse(res, 500, { message: exceptions.INTERNAL_SERVER_ERROR });
    }
};

const authUser = async (req, res) => {
    try {
        const { token, user } = await AuthService.authenticate(req.user.id);
        
        return buildResponse(res, 200, { token, user });
    } catch (err) {
        console.error(err);
        return buildResponse(res, 500, { message: exceptions.INTERNAL_SERVER_ERROR });
    }
};

module.exports = { registerUser, loginUser, authUser };
