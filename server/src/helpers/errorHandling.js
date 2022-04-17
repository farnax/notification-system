class ErrorHandler extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
    }
}

const handleError = (err, res) => {
    const { statusCode, message } = err;
  
    res.status(statusCode);
    res.json({
      status: 'error',
      statusCode,
      message,
    });
  };

module.exports = { ErrorHandler, handleError };
