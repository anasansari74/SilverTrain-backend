import { Request, Response } from "express";
import { findUserWithValidation } from "./services";

// const { createToken } = require("../utils/authGenerator");
import { createToken, validateToken } from "../../utils/authGenerator";

export const loginUser = async (req: Request, res: Response) => {
  const userCreds = req.body;

  try {
    console.log("testing...");

    const loggedUser = await findUserWithValidation(userCreds);
    console.log("Anything:", loggedUser);

    const token = createToken({
      id: loggedUser.id,
      username: loggedUser.username,
    });

    //creating the cookie here:
    //credential: include in the frontend
    res.cookie("token", token, { httpOnly: true });

    res.json({
      data: {
        id: loggedUser.id,
        username: loggedUser.username,
      },
    });
  } catch (error) {
    console.error({ error });
    res.status(401).json({ error: error });
    res.status(401).json({ error: "You are unauthorized" });
  }
};

export const logOutUser = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ msg: "You've been successfully logged out", data: null });
};
