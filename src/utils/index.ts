import { Response } from "express";
import { AxiosError } from "axios";
import logger from "../services/logger.service.js";

function respondErrorDetailsForAdminsOnly<T extends Error | AxiosError>(
  res: Response,
  e: T,
) {
  logger.error(e.stack);
  logger.error(e.message);

  let message = `There has been an error (500) | Details ${String(e)}`;
  let code = 500;

  if (typeof e === "string") {
    message = e;
  } else if (typeof e === "object" && "message" in e) {
    message = e.message;
    code = "code" in e ? parseInt(e.code) : 500;
  }

  logger.error(`There has been an error (${code}) ${message}`);

  res.statusMessage = message;
  res.status(code);

  res.send({
    code,
    message,
    stack: e.stack,
  });
}

export const sendError = (res: Response, e: any) => {
  logger.error(e.stack);
  logger.error(e.message);
  if (e && e.response) {
    res.statusMessage = e.message;
    logger.error(`There has been an error (${e.code}) ${e.message}`);
    res.status(e.code);
    res.send(e.code);
  } else {
    res.status(500);
    logger.error(`There has been an error (500) | Details ${e}`);
    res.send();
  }
};

export { respondErrorDetailsForAdminsOnly };
