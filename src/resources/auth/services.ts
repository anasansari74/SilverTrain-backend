import dbClient from "../../utils/database";

import { compare, hash } from "bcrypt";

import { User } from ".prisma/client";

export type UserWithInfo = {
  userName: string;
  password: string;
  role: string;
  info: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    bio: string;
  };
};

export const findUserWithValidation = async (userCreds: User) => {
  const foundUser = await dbClient.user.findFirst({
    where: { username: userCreds.userName },
  });

  console.log("Found user:", foundUser);

  if (!foundUser) throw Error("Username/Password Incorrect!");

  const isPasswordValid = await compare(userCreds.password, foundUser.password);
  if (!isPasswordValid) throw Error("Username/Password Incorrect!");

  return foundUser;
};

export const createdWithHash = async (newUser: UserWithInfo) => {
  const plainText = newUser.password;

  const hashedPassword = await hash(plainText, 15);

  const savedUser = dbClient.user.create({
    data: { ...newUser, password: hashedPassword },
  });

  return savedUser;
};
