const express = require("express");
const usersRouter = require("./routes/users-routes");
const btcRouter = require("./routes/btc-routes");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  return res.json({
    message: "Welcome!",
  });
});

app.use(usersRouter);
app.use(btcRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
