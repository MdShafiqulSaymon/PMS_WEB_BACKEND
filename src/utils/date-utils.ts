import dayjs, { ManipulateType } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import logger from "../services/logger.service.js";
dayjs.extend(customParseFormat);
dayjs.extend(timezone);
dayjs.extend(utc);

export enum Time {
  WEEK = 604800,
  DAY = 86400,
  HALF_DAY = 43200,
  QUARTER_DAY = 21600,
  HOUR = 3600,
  DEFAULT_TIMEZONE = "America/Chicago",
}

export default class DateUtils {
  static dateFrom = (value: string): Date => {
    //parse from YYYY-MM-DD format
    const parts = value.split("-");
    return parts.length == 3
      ? new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
      : new Date(0);
  };

  static dateFromStandardFormat(value: string): Date {
    //parse from M-D-YYYY format
    return DateUtils.dateTimeFrom(value, "M/D/YYYY");
  }

  static dateParseFromSFDateOnly(value: string): Date {
    const [first] = value.split("T");
    return DateUtils.dateFrom(first);
  }

  static dateOrEmpty(date: Date | undefined) {
    return date || new Date(0);
  }

  static diff(dateA: Date, dateB: Date, unit: ManipulateType) {
    return dayjs.tz(dateA, Time.DEFAULT_TIMEZONE).diff(dateB, unit);
  }

  static subtract(date: Date, value: number, unit: ManipulateType) {
    return dayjs.tz(date, Time.DEFAULT_TIMEZONE).subtract(value, unit).toDate();
  }

  static getDateOnlyISOFormat(date: Date): string {
    // YYYY-MM-DD
    return dayjs.tz(date, Time.DEFAULT_TIMEZONE).format("YYYY-MM-DD");
  }

  static getDateISOFormat(date: Date): string {
    // YYYY-MM-DD H:mm
    return dayjs.tz(date, Time.DEFAULT_TIMEZONE).format("YYYY-MM-DD H:mm");
  }

  static getDateStandardFormat(date: Date): string {
    // MM/DD/YYYY
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  static dateTimeFrom(date: string, format: string = "M/D/YYYY H:mm") {
    if (dayjs(date, format).isValid()) {
      return dayjs(date, format).toDate();
    }
    logger.error(`${date} is not valid ${format}`);
    return null;
  }

  static dateFromDateZone(
    date: Date,
    zone: string = Time.DEFAULT_TIMEZONE,
  ): Date {
    if (dayjs.tz(date, zone).isValid()) {
      return dayjs.tz(date, zone).toDate();
    }
    logger.error(`${date} is not valid`);
    return null;
  }

  static dateTimeFromZone(
    date: string,
    zone: string = Time.DEFAULT_TIMEZONE,
    format: string = "M/D/YYYY H:mm",
  ): Date {
    if (dayjs.tz(date, format, zone).isValid()) {
      return dayjs.tz(date, format, zone).toDate();
    }
    logger.error(`${date} is not valid ${format}`);
    return null;
  }

  static fromUTCtoLocal(date: Date): Date {
    if (date) {
      return dayjs.utc(date).local().toDate();
    }
    return null;
  }

  static getSFDateOrEmpty(date: Date, zone = false): string {
    if (date) {
      return zone
        ? dayjs.tz(date, Time.DEFAULT_TIMEZONE).format("YYYY-MM-DDTHH:mm:ss")
        : dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
    }
    return "";
  }

  static getSFDateOrDefault(date: Date, zone = false, defaultDate: Date) {
    const selectedDate = date ?? defaultDate;

    return DateUtils.getSFDateOrEmpty(selectedDate, zone);
  }

  static addDays(date: Date, days: number): Date {
    return dayjs(date).add(days, "day").toDate();
  }

  static addMinute(date: Date, minutes: number): Date {
    return dayjs(date).add(minutes, "minute").toDate();
  }
}
