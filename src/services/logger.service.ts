import { createLogger, format, Logger, transports } from "winston";
import winston from "winston";

const { json, combine, timestamp, splat, errors, prettyPrint, label } = format;

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger: Logger = createLogger({
  exitOnError: false,
  format: combine(
    label({ label: "jhamelaKom" }),
    timestamp(),
    enumerateErrorFormat(),
    errors({ stack: true }),
    json(),
    prettyPrint()
  ),
  transports: [
    new winston.transports.Console({
      // stderrLevels: ["error"],
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    new winston.transports.File({
      filename: "logs/warn.log",
      level: "warn",
    }),
  ],
});
export default logger;
