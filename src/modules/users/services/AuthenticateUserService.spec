// import 'reflect-metadata';
// import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
// import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersrepository';
// // import AppError from '@shared/errors/AppError';
// import CreateUsersService from './CreateUsersService';

// describe('AuthenticateUser', () => {
//   it('should be able to create a user token', async () => {
//     const fakeUsersRepository = new FakeUsersRepository();
//     const createUser = new CreateUsersService(fakeUsersRepository);
//     const authenticateUser = new AuthenticateUserService(fakeUsersRepository);

//     const user = await createUser.execute({
//       name: 'Rômulo Fraga',
//       email: 'romulo@test.com',
//       password: '123456',
//     });

//     const userAuth = {
//       user,
//       token: '123456',
//     };

//     await authenticateUser.execute({
//       email: 'romulo@test.com',
//       password: '123456',
//     });

//     expect(userAuth).toHaveProperty('token');
//     expect(authenticateUser.execute).toBeCalled();
//   });

//   // it('should not be able to create a user token with wrong email', async () => {
//   //   it('should be able to create a user token', async () => {
//   //     const fakeUsersRepository = new FakeUsersRepository();
//   //     const createUser = new CreateUsersService(fakeUsersRepository);
//   //     const authenticateUser = new AuthenticateUserService(fakeUsersRepository);

//   //     await createUser.execute({
//   //       name: 'Rômulo Fraga',
//   //       email: 'romulo@test.com',
//   //       password: '123456',
//   //     });

//   //     await authenticateUser.execute({
//   //       email: 'romulo@test.com.br',
//   //       password: '123456',
//   //     });

//   //     expect(
//   //       authenticateUser.execute({
//   //         email: 'romulo@test.com.br',
//   //         password: '123456',
//   //       }),
//   //     ).rejects.toBeInstanceOf(AppError);
//   //   });
//   // });
// });
