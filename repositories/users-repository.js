const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const usersPath = path.join(__dirname, "..", "db", "users.json");

const getAllUsers = async usersPath => {
  return JSON.parse(await fs.readFile(usersPath, "utf-8"));
};

const addNewUser = async ({ name = "Guest", email, password }) => {
  try {
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password,
    };

    const data = await fs.readFile(usersPath, "utf-8");
    const allUsers = [...JSON.parse(data), newUser];

    await fs.writeFile(usersPath, JSON.stringify(allUsers, null, 2));
  } catch (error) {
    console.log("Error in addNewUser: ", error.message);
  }
};

const isUniqueUser = async email => {
  const allUsers = await getAllUsers(usersPath);
  const isUnique = allUsers.find(user => user.email === email);

  return !isUnique;
};

module.exports = { getAllUsers, addNewUser, isUniqueUser };
