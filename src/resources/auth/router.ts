import { Router } from "express";

const authRouter = Router();

const {
  loginUser,
  logOutUser,
  // validateLoggedInToken,
} = require("./controller");

const { createOneUser } = require("../users/controller");

authRouter.route("/login").post(loginUser);

authRouter.route("/logout").get(logOutUser);

authRouter.route("/signup").post(createOneUser);

// authRouter.route("/validate-token").get(validateLoggedInToken);

export default authRouter;
