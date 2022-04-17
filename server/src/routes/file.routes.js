const Router = require('express');
const FilesCtrl = require('../controllers/file.controllers.js');

const router = new Router();

router.get('/', FilesCtrl.getFiles);
router.post('/', FilesCtrl.uploadFile);
router.get('/:id', FilesCtrl.downloadFile);
router.delete('/:id', FilesCtrl.removeFile);

module.exports = router;
