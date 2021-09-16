import dbClient from "../utils/database";

import { compare, hash } from "bcrypt";

import { User } from ".prisma/client";

export const findUserWithValidation = async (userCreds: User) => {
  const foundUser = await dbClient.user.findFirst({
    where: { username: userCreds.username },
  });

  if (!foundUser) throw Error("Username/Password Incorrect!");

  const isPasswordValid = await compare(userCreds.password, foundUser.password);
  if (!isPasswordValid) throw Error("Username/Password Incorrect!");

  return foundUser;
};
