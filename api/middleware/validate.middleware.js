const ApiError = require("../utils/ApiError");

module.exports.validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return next(new ApiError(400, error.details[0].message, error.details.map((detail) => detail.message)));
        }
        req.body = value;
        next();
    };
};
