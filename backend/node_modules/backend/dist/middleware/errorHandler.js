"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.methodLogger = void 0;
const errorHandler = (res, error) => {
    console.error("Error details params:", error.params); // params, query, res also
    console.error("Error details query:", error.query); // params, query, res also
    console.error("Error details body:", error.body); // params, query, res also
    if (error.name === 'ValidationError') {
        res.status(400).json({
            error: 'Validation failed',
            details: error.errors
        });
    }
    else {
        const statusCode = error.statusCode || 500;
        const message = error.message || 'An unexpected error occurred';
        res.status(statusCode).json({ error: message });
    }
};
const methodLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};
exports.methodLogger = methodLogger;
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map