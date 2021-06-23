const { Router } = require("express");
const controllers = require("../controllers/users-controllers");

const usersRouter = Router();

usersRouter.post("/user/create", controllers.createUser);
usersRouter.post("/user/login", controllers.loginUser);

module.exports = usersRouter;
