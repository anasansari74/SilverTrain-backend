import { Request, Response } from "express";
import { findUserWithValidation } from "./services";

import { createToken, validateToken } from "../../utils/authGenerator";

export const loginUser = async (req: Request, res: Response) => {
  const userCreds = { ...req.body };

  // if (!userCreds.userName || !userCreds.password) {
  //   res.status(400).json({ error: "Missing username or password" });
  // }

  try {
    const loggedUser = await findUserWithValidation(userCreds);

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
    res.status(500).json({ error });
  }
};

export const logOutUser = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ msg: "You've been successfully logged out", data: null });
};
