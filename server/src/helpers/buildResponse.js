const buildResponse = (res, statusCode, message) => {
    res.status(statusCode);
    res.json(message);
};
  
module.exports = buildResponse;
