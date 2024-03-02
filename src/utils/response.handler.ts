import { Response } from "express";
import { HTTPStatus, HTTPStatusValues } from "../constants/http.response.js";

interface SuccessResponse {
  res: Response;
  status: HTTPStatus;
  data: unknown;
}

export class AppError extends Error {
  // ToDo: Application specific error code
  // public errorCode: AppErrorCode;

  statusCode: number;

  constructor(status: HTTPStatus) {
    super(HTTPStatusValues[status].message);
    this.statusCode = HTTPStatusValues[status].code;
  }
}

export class ResponseHandler {
  // handle custom Exceptions
  private static handleKnownException(err: AppError, res: Response) {
    const { statusCode, message } = err;
    res.status(statusCode).json({ error: { message } });
  }

  // handle RuntimeExceptions
  private static handleUnknownException(err: Error, res: Response) {
    if (err instanceof AppError) {
      res
        .status(err.statusCode)
        .json({
          error: {
            message: HTTPStatusValues[HTTPStatus.INTERNAL_SERVER_ERROR].message,
          },
        });
    } else {
      res
        .status(HTTPStatusValues[HTTPStatus.INTERNAL_SERVER_ERROR].code)
        .json({
          error: {
            message: HTTPStatusValues[HTTPStatus.INTERNAL_SERVER_ERROR].message,
          },
        });
    }
  }

  static handleResponse(obj: SuccessResponse) {
    const { res, status, data } = obj;
    res
      .status(HTTPStatusValues[status].code)
      .send({ message: HTTPStatusValues[status].message, data });
  }

  static handleException(err: AppError | Error, res: Response) {
    console.error(err);
    err instanceof AppError
      ? this.handleKnownException(err, res)
      : this.handleUnknownException(err, res);
  }
}
