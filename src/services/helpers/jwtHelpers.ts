import JWT, { type JwtPayload } from "jsonwebtoken";
import type User from "../../models/user.js";
import dotenv from "dotenv";

dotenv.config();

export const createJWT = (dataUser: User) => {
  const { email, name, isAdmin, id } = dataUser;
  const jwtPayload = { email, name, isAdmin, id };
  const jwt = JWT.sign(jwtPayload, process.env.JWT_SECRET as string);
  return jwt;
};

export const decodeJWT = (token: string) => {
  return JWT.decode(token, { json: true });
};

export const verifyJWT = (token: string) => {
  return JWT.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
};
