import { Router } from "express";

const userRouter = Router();

const { getUserById, getUserByUserName } = require("./controller");

userRouter.get("/:id", getUserById);

userRouter.get("/username/:userName", getUserByUserName);

export default userRouter;
