class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);                 // call the parent constructor
        this.statusCode = statusCode;   // set the status code
    }
}

module.exports = ErrorResponse;
