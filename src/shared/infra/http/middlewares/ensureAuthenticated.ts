import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // o tokem vem Brearer dfljfeiof, isso divide no espaço e recupera o token que vem no header
  const [, token] = authHeader.split(' ');

  try {
    // retorna {iat, exp e sub (id do usuário)}
    const decoded = verify(token, authConfig.jwt.secret);

    // console.log(decoded);

    const { sub } = decoded as TokenPayload;

    //adiciona ao Request, o id do user, que é repassado para todas as rotas que utilizam esse middleware
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
