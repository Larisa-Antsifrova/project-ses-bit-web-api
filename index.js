const express = require("express");
const helmet = require("helmet");
const usersRouter = require("./routes/users-routes");
const btcRouter = require("./routes/btc-routes");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(helmet());

app.use(express.json());

app.get("/", function (req, res) {
  return res.json({
    message:
      "Welcome! Please visit /user/create endpoint to register or /user/login to login. Once logged in you can visit /btcRate to learn what current bitcoin rate is.",
  });
});

app.use(usersRouter);
app.use(btcRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;

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
