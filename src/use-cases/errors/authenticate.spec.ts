import { expect, test, describe, it, beforeEach } from 'vitest';
import { compare, hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from '../authenticate';
import { InvalidCredentialsError } from './invalid-credentials-error';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'teste123',
      email: 'teste123@teste.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      email: 'teste123@teste.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'teste123@teste.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'teste123',
      email: 'teste123@teste.com',
      password_hash: await hash('123456', 6),
    });

    await expect(() =>
      sut.execute({
        email: 'teste123@teste.com',
        password: '123',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
