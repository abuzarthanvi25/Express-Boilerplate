// Modified JS's Own HTTP Exception class for custom errors
class HttpException extends Error {
    constructor(message, status, errors) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
    }
}

// Created a custom class
class HttpSuccess {
    constructor(data, message) {
        this.result = data;
        this.message = message;
        this.is_success = true;
    }
}

module.exports = {
    HttpException,
    HttpSuccess,
};
