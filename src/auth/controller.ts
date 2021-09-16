import { Request, Response } from "express";
import { findUserWithValidation } from "./services";

// const { createToken } = require("../utils/authGenerator");
import { createToken } from "../utils/authGenerator";

const loginUser = async (req: Request, res: Response) => {
  const userCreds = req.body;

  try {
    const loggedUser = await findUserWithValidation(userCreds);

    const token = createToken({
      id: (await loggedUser).id,
      username: (await loggedUser).username,
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
    res.status(401).json({ error: error });
  }
};

const logOutUser = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ msg: "You've been successfully logged out", data: null });
};

module.exports = {
  loginUser,
  logOutUser,
  //   validateLoggedInToken,
};
