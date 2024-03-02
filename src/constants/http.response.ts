export enum HTTPStatus {
  OK = "OK",
  CREATED = "CREATED",
  NO_CONTENT = "NO_CONTENT",
  NOT_FOUND = "NOT_FOUND",
  DELETE = "DELETE",
  FORBIDDEN = "FORBIDDEN",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  UNPROCESSABLE_ENTITY = "UNPROCESSABLE_ENTITY", //422
  BAD_REQUEST = "BAD_REQUEST", //400
  UNAUTHORIZED = "UNAUTHORIZED", //401
}

export const HTTPStatusValues = {
  OK: {
    code: 200,
    message: "OK",
  },
  CREATED: {
    code: 201,
    message: "Created successfully.",
  },
  NO_CONTENT: {
    code: 204,
    message: "No Content",
  },
  NOT_FOUND: {
    code: 404,
    message: "Unable to find the resource!",
  },
  FORBIDDEN: {
    code: 403,
    message: "Forbidden",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: "Something went wrong.",
  },
  DELETE: {
    code: 200,
    message: "Deleted successfully!",
  },
  BAD_REQUEST: {
    code: 400,
    message: "Bad Request",
  },
  UNAUTHORIZED: {
    code: 401,
    message: "Unauthorized",
  },
  UNPROCESSABLE_ENTITY: {
    code: 422,
    message: "Unprocessable Entity",
  },
};
