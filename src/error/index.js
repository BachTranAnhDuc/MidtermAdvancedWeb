const errorHandler = require("../middleware/error-handle.js");
const notFound = require("../middleware/not-found.js");
const BadRequestError = require("./bad-request.js");
const notFoundError = require("./not-found.js");

exports = {
  errorHandler,
  notFound,
  BadRequestError,
  notFoundError,
};
