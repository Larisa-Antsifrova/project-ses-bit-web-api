const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const usersPath = path.join(__dirname, "..", "db", "users.json");

const getAllUsers = async usersPath => {
  try {
    return JSON.parse(await fs.readFile(usersPath, "utf-8"));
  } catch (error) {
    console.log("Error in getAllUsers: ", error.message);
  }
};

const getUserByEmail = async email => {
  try {
    const allUsers = await getAllUsers(usersPath);
    const requestedUser = allUsers.find(user => user.email === email);

    return requestedUser;
  } catch (error) {
    console.log("Error in getUserByEmail: ", error.message);
  }
};

const addNewUser = async ({ name = "Guest", email, password }) => {
  try {
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password,
    };

    const allUsers = await getAllUsers(usersPath);
    const updatedAllUsers = [...allUsers, newUser];

    await fs.writeFile(usersPath, JSON.stringify(updatedAllUsers, null, 2));
  } catch (error) {
    console.log("Error in addNewUser: ", error.message);
  }
};

const isUniqueUser = async email => {
  try {
    const allUsers = await getAllUsers(usersPath);
    const isUnique = allUsers.find(user => user.email === email);

    return !isUnique;
  } catch (error) {
    console.log("Error in isUniqueUser: ", error.message);
  }
};

module.exports = { getAllUsers, getUserByEmail, addNewUser, isUniqueUser };
