const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../repositories/users-repository");
const isUniqueUser = require("../helpers/is-unique");
const { HttpCodes } = require("../helpers/constants");

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isUnique = await isUniqueUser(email);

    if (!isUnique) {
      return res
        .status(HttpCodes.CONFLICT)
        .json({ message: "This email is already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const addedUser = await User.addNewUser({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(HttpCodes.CREATED)
      .json({ message: "You have successfully registered.", user: addedUser });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.getUserByEmail(email);

    if (!user) {
      return res
        .status(HttpCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(HttpCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials." });
    }

    const payload = { id: user.id, name: user.name };
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "4h" }); // access token is given for 4 hours

    return res.json({
      message: "You have successfully logged in.",
      user: { name: user.name, email: user.email, token },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, loginUser };
