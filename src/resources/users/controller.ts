import { Role } from ".prisma/client";
import { Request, Response } from "express";
import { createToken } from "../../utils/authGenerator";

import prisma from "../../utils/database";

import { createdWithHash, UserWithInfo } from "../auth/services";

// CREATE A NEW USER ✔
export const createOneUser = async (req: Request, res: Response) => {
  const { userName, firstName, lastName, dateOfBirth, password, bio } =
    req.body;

  const newUser: any = {
    userName,
    password,
    role: Role.USER,
    userInfo: {
      create: {
        firstName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        bio,
      },
    },
  };

  try {
    const savedUser = await createdWithHash(newUser);

    console.log("New Hash User:", savedUser);

    const token = createToken({
      id: savedUser.id,
      userName: savedUser.userName,
    });

    if (savedUser && token) {
      res.cookie("token", token, { httpOnly: true });

      res.json({
        user: {
          id: savedUser.id,
          userName: savedUser.userName,
          role: Role.USER,
        },
      });
    }
    if (!savedUser && !token)
      res.json({ msg: "User and token could not be created" });
    if (!savedUser) res.json({ msg: "User cound not be created" });
    if (!token) res.json({ msg: "token could not be created" });
  } catch (e) {
    console.log(e);
    res.json(`ERROR: ${e}`);
  }
};

// GET ONE USER ✔
export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const result = await prisma.user.findUnique({
      where: { id },
      include: { userInfo: true, tickets: true },
    });
    if (result) res.json(result);
    if (!result) res.json({ msg: "User not found" });
  } catch (error) {
    console.log(error);
  }
};

// GET ONE USER by username ✔
export const getUserByUserName = async (req: Request, res: Response) => {
  const userName = req.params.userName.toString();

  try {
    const result = await prisma.user.findUnique({
      where: { userName },
      include: { userInfo: true, tickets: true },
    });
    if (result) res.json(result);
    if (!result) res.json({ msg: "User not found" });
  } catch (error) {
    console.log(error);
  }
};
