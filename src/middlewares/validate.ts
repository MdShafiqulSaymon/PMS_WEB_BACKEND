import Joi from "joi";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import pick from "../utils/pick.js";
import { NextFunction, Request } from "express";
const validate = schema => (req: Request, res, next: NextFunction) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map(details => details.message.replace(`"`, "").replace(`"`, ""))
      .join(", ");
    return next(
      new ApiError(httpStatus.BAD_REQUEST, errorMessage.replace(`"`, "")),
    );
  }
  Object.assign(req, value);
  return next();
};

export default validate;
