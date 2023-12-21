const { HTTP_CODES } = require("../config/enums/status-codes");
const { HttpException } = require("../utils/custom-classes/http-responses");

const errorHandler = (
    err,
    _req,
    res,
    _next
) => {
    const errors = [];

    // API Not Found
    if (err.message === "Not Found") {
        err = new HttpException("Not Found", HTTP_CODES.NOT_FOUND);
    }

    res.status(err.status || HTTP_CODES.INTERNAL_SERVER_ERROR).json({
        success: false,
        status: err.status || HTTP_CODES.INTERNAL_SERVER_ERROR,
        message: err.message || "Server Error",
        errors,
    });
};

module.exports = errorHandler;
