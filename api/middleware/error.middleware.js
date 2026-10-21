const ApiError = require("../utils/ApiError");

module.exports.notFound = (req, res, next) => {
    next(new ApiError(404, "Route not found"));
};

module.exports.errorHandler = (error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Internal server error";
    let details = error.details;

    if (error.isJoi) {
        statusCode = 400;
        message = error.details[0].message;
        details = error.details.map((detail) => detail.message);
    } else if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        statusCode = 400;
        message = "Invalid JSON body";
    } else if (error.name === "CastError") {
        statusCode = 400;
        message = "Invalid id format";
    } else if (error.name === "ValidationError") {
        statusCode = 400;
        message = "Validation failed";
        details = Object.values(error.errors).map((item) => item.message);
    } else if (error.code === 11000) {
        statusCode = 409;
        message = "Duplicate value already exists";
    }

    if (statusCode >= 500) {
        console.error(error);
    }

    return res.status(statusCode).json({
        success: false,
        message,
        ...(details ? { errors: details } : {})
    });
};
