const express = require("express");

const userRouter = express.Router();
const authController = require("../controllers/authController");

userRouter.post("/signup", authController.signUp);
userRouter.post("/login", authController.login);

module.exports = userRouter;
