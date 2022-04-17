const { check } = require('express-validator');
const Router = require('express');
const authMiddleware = require('../middleware/auth.middleware.js');
const AuthCtrl = require('../controllers/auth.controllers.js');

const router = new Router();

router.post('/registration',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({ min:3, max:12 })
    ], AuthCtrl.registerUser
);

router.post('/login', AuthCtrl.loginUser);

router.get('/auth', authMiddleware, AuthCtrl.authUser);

module.exports = router;
