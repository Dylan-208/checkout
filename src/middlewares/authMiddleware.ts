import type { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../services/helpers/jwtHelpers.js";

class AuthMiddleware {
  async user(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        throw new Error("Usuário não autorizado");
      }
      const auth = req.headers.authorization.split(" ");
      const token = auth[1];
      const verifyToken = verifyJWT(token as string);
      (req as any).email = verifyToken.email;
      next();
      return;
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }
}

export default AuthMiddleware;
