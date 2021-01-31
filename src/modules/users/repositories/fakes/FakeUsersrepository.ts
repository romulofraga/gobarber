// repositorio de appointments especifico para typeorm

import { v4 } from 'uuid';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

// o repositorios de appointments tem o formato de IAppointmentsRepository
class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const userByEmail = this.users.find(user => user.email === email);

    return userByEmail;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUserById = this.users.find(user => user.id === id);

    return findUserById;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4(), name, email, password });

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
