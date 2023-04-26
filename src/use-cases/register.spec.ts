import { expect, test, describe, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: 'teste123',
      email: 'teste123@teste.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it('should hash user password unpon registration', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: 'teste123',
      email: 'teste123@teste.com',
      password: '123456',
    });

    const isPasswordHashedCorrectly = await compare(
      '123456',
      user.password_hash
    );

    expect(isPasswordHashedCorrectly).toBe(true);
  });
  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = 'teste123@teste.com';

    await registerUseCase.execute({
      name: 'teste123',
      email: email,
      password: '123456',
    });

    await expect(() =>
      registerUseCase.execute({
        name: 'teste123',
        email: email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});

test('check if it works', () => {
  expect(2 + 2).toBe(4);
});
