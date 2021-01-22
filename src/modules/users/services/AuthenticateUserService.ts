import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import authConfig from 'config/auth';
import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    //retorna true ou false se o passwotd encriptado no db nao for igual ao passado na rota
    const passwordMatched = await compare(password, user.password as string);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // assina e gera um token onde o primeiro parametro são configs uteis mas não sensiveis
    // a chave secreta unica para gerar nosso token
    // subject -> sempre como o id  e a data de inspiração
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}