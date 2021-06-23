const User = require("../repositories/users-repository");

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isUnique = await User.isUniqueUser(email);

    if (!isUnique) {
      return res.status(400).json({ message: "This email is already in use." });
    }

    const newUser = await User.addNewUser({ name, email, password });

    return res
      .status(201)
      .json({ message: "You have successfully registered.", user: newUser });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {};

module.exports = { createUser, loginUser };
