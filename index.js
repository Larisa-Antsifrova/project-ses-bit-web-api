const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  return res.json({
    message:
      "Welcome!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});