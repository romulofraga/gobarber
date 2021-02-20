// repositorio de appointments especifico para typeorm
import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import IFindAllProviders from '@modules/users/dtos/IFindAllProvidersDTO';
import User from '../entities/User';

// o repositorios de appointments tem o formato de IAppointmentsRepository
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProviders): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findAUserByEmail = await this.ormRepository.findOne({
      where: { email },
    });

    return findAUserByEmail;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUserById = await this.ormRepository.findOne(id);

    return findUserById;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const saveUser = this.ormRepository.save(user);

    return saveUser;
  }
}

export default UsersRepository;
