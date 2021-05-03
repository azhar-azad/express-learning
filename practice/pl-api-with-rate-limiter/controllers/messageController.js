const sendData = (res, statusCode, data) => {
    res.status(statusCode).json({
        success: true,
        data: data
    });
};

const sendError = (res, statusCode, message) => {
    res.status(statusCode).json({
        success: false,
        message: message
    });
};

module.exports = {
    sendData,
    sendError
};