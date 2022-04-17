const Router = require('express');
const NotificationCtrl = require('../controllers/notification.controllers.js');
const validationMiddleware = require('../middleware/validation.middleware.js');

const router = new Router();

router.get('/', NotificationCtrl.getOptions);
router.post('/', validationMiddleware, NotificationCtrl.setOptions);

module.exports = router;
