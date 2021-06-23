const bcrypt = require("bcryptjs");
const User = require("../repositories/users-repository");

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isUnique = await User.isUniqueUser(email);

    if (!isUnique) {
      return res.status(400).json({ message: "This email is already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    await User.addNewUser({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "You have successfully registered." });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {};

module.exports = { createUser, loginUser };
