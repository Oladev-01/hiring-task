import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Env } from "../env";
import { UserEntity } from "../entities";
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, Env.secretKey as jwt.Secret);
    req.user = decoded as UserEntity;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
