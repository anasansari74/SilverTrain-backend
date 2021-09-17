import { Request, Response, NextFunction } from "express";
import { validateToken } from "../utils/authGenerator";

export const loginAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  let userData = null;

  if (token) {
    userData = token && validateToken(token);
  }

  if (userData) {
    req.currentUser = userData;
    next();
  } else {
    res
      .status(401)
      .json({ err: "You need to be logged in to access the data" });
  }
};
