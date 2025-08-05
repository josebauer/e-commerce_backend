import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: User | null;
}

export async function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      message: 'Não autorizado! Nenhum token foi encontrado.',
    });
  }

  const token = authorizationHeader.replace(/Bearer\s+/i, '');

  try {
    const decoded = jwtService.verifyTokenSync(token) ;

    const email = decoded?.email;
    if (!email || typeof email !== 'string') {
      return res.status(401).json({
        message: 'Token inválido. E-mail não encontrado no payload.',
      });
    }

    const user = await userService.findByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: 'Usuário não encontrado.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Não autorizado! Token inválido ou expirado.',
    });
  }
}