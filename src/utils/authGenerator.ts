import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const createToken = (payload: jwt.JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET);
};

export const validateToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
