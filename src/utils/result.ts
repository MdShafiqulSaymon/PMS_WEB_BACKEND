import { AppError } from "./response.handler.js";
import { HTTPStatus,HTTPStatusValues } from "../constants/http.response.js";
/**
 * ToDo: List response
 *  
 * _metadata = {
        total_record: results.total,
        next_offset: results.nextOffset,
    };

   response = {
        _metadata,
        records,
    }
 * */
export class Result<V, E> {
  public isSuccess: boolean;
  public statusCode: number;
  public message: string;
  private errors: E;
  private data: V;

  private constructor(
    isSuccess: boolean,
    statusCode: number,
    message: string,
    data: V,
    error: E,
  ) {
    if (isSuccess && error) {
      throw new Error("Successful result must not contain an error");
    } else if (!isSuccess && data) {
      throw new Error("Unsuccessful error must not contain a data");
    }

    this.isSuccess = isSuccess;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    if (error instanceof AppError) {
      delete error.statusCode;
    }
    this.errors = error;
  }

  public static ok<V>(status: HTTPStatus, data?: V): Result<V, undefined> {
    return new Result(
      true,
      HTTPStatusValues[status].code,
      HTTPStatusValues[status].message,
      data,
      undefined,
    );
  }

  public static fail<E>(error: E): Result<undefined, E> {
    if (error instanceof AppError) {
      return new Result(
        false,
        error.statusCode,
        error.message,
        undefined,
        error,
      );
    }
    return new Result(
      false,
      HTTPStatusValues[HTTPStatus.INTERNAL_SERVER_ERROR].code,
      HTTPStatusValues[HTTPStatus.INTERNAL_SERVER_ERROR].message,
      undefined,
      error,
    );
  }

  public static error<E>(error: E): Result<undefined, E> {
    return new Result(
      false,
      HTTPStatusValues[HTTPStatus.NOT_FOUND].code,
      HTTPStatusValues[HTTPStatus.NOT_FOUND].message,
      undefined,
      error,
    );
  }

  public getError(): E {
    if (this.isSuccess) {
      throw new Error("Successful result does not contain an error");
    }

    return this.errors;
  }

  public getData(): V {
    if (this.isSuccess === false) {
      throw new Error("Unsuccessful result does not contain a value");
    }

    return this.data;
  }
}
