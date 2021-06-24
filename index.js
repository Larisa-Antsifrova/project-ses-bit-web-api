const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const { apiLimiterConfig } = require("./helpers/api-limiter-config");
const homeRouter = require("./routes/home-route");
const usersRouter = require("./routes/users-routes");
const btcRouter = require("./routes/btc-routes");
const { Ports, HttpCodes } = require("./helpers/constants");
require("dotenv").config();

const PORT = process.env.PORT || Ports.default;

const app = express();
app.use(helmet());

app.use(express.json());

// TODO: to set limiters for each route
const apiLimiter = rateLimit(apiLimiterConfig);
app.use(apiLimiter);

app.use(homeRouter);
app.use(usersRouter);
app.use(btcRouter);

// General errors handlers
app.use((req, res) => {
  res.status(HttpCodes.NOT_FOUND).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const status = err.status || HttpCodes.INTERNAL_SERVER_ERROR;

  res.status(status).json({
    message: err.message,
  });
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
