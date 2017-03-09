function ApiError(message, status) {
  this.message = message;
  this.status = status;
  this.stack = Error().stack;
}

ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.name = "ApiError";

module.exports = ApiError;