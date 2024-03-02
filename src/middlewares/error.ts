import httpStatus from "http-status";
import logger from "../services/logger.service.js";
import ApiError from "../utils/ApiError.js";

export const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode
            ? httpStatus.BAD_REQUEST
            : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    if (!err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,

        // ...(config.env === "development" && { stack: err.stack }),
    };

    logger.error(err);

    res.status(statusCode).send(response);
};
