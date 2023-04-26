import { expect, test, describe, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';

describe('Register Use Case', () => {
  it('should hash user password unpon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async create(data) {
        return {
          id: 'user1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
          updated_at: new Date(),
        };
      },
      async findByEmail(email) {
        return null;
      },
    });

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
});

test('check if it works', () => {
  expect(2 + 2).toBe(4);
});
