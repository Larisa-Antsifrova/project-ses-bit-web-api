const { HttpCodes } = require("./constants");

const apiLimiterConfig = {
  windowMs: 15 * 60 * 1000, // period of 15 minutes
  max: 100, // maximum requests allowed within windowMs
  handler: (req, res, next) => {
    return res.status(HttpCodes.TOO_MANY_REQUESTS).json({
      message: "Too many requrests made. Please try again later.",
    });
  },
};

module.exports = { apiLimiterConfig };
