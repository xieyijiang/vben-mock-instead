const { _4xxErrors, _5xxErrors } = require("../errors");

function errObj(status, options) {
  options = options || {};
  
  if (status < 400 || status >= 600) {
    throw new Error("Invalid status code");
  }
  const statusStr = status.toString();
  const errors = statusStr.startsWith("4") ? _4xxErrors : _5xxErrors;
  return {
    code: options.code !== undefined ? options.code : -1,
    data: options.data !== undefined ? options.data : null,
    error: options.error !== undefined ? options.error : (errors[status] || "Unknown error"),
    message: options.message !== undefined ? options.message : (errors[status] || "Unknown error"),
  };
}

module.exports = { errObj };
