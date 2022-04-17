const FileService = require('../services/file.services.js');
const { ErrorHandler, handleError } = require('../helpers/errorHandling.js');
const buildResponse = require('../helpers/buildResponse.js');
const exceptions = require('../exceptions/exceptions.js');

const getFiles = async (req, res) => {
    try {
        const files = await FileService.getAll(req.user.id);
        return buildResponse(res, 200, files);
    } catch (err) {
        console.error(err);
        return buildResponse(res, 500, { message: exceptions.CAN_NOT_GET_FILES }); 
    }
};

const uploadFile = async (req, res) => {
    try {
        const file = req.files.file;
        
        const uploadedFile = await FileService.upload(file, req.user.id);
        return buildResponse(res, 201, uploadedFile);
    } catch (err) {
        console.error(err);
        if (err instanceof ErrorHandler) return handleError(err, res);
        return buildResponse(res, 500, { message: exceptions.CAN_NOT_UPLOAD_FILE }); 
    }
};

const downloadFile = async (req, res) => {
    try {
        const filePath = await FileService.download(req.params.id, req.user.id);
        return res.download(filePath);
    } catch (err) {
        console.error(err);
        if (err instanceof ErrorHandler) return handleError(err, res);
        return buildResponse(res, 500, { message: exceptions.CAN_NOT_DOWNLOAD_FILE }); 
    }
};

const removeFile = async (req, res) => {
    try {
        await FileService.remove(req.params.id, req.user.id);
        return buildResponse(res, 200, { message: 'Deleted successfully' });
    } catch (err) {
        console.error(err);
        if (err instanceof ErrorHandler) return handleError(err, res);
        return buildResponse(res, 500, { message: exceptions.CAN_NOT_REMOVE_FILE });
    }
};

module.exports = { getFiles, uploadFile, downloadFile, removeFile };