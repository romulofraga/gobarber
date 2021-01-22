import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}
export default class CreateUsersService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('User already Exists');
    }

    const passwordHashed = await hash(password, 8);
    const user = usersRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    await usersRepository.save(user);
    delete user.password;
    return user;
  }
}
