import { Router } from "express";

const userRouter = Router();

const { getUserById } = require("./controller");

userRouter.get("/:id", getUserById);

export default userRouter;
