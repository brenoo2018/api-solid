import { expect, test, describe, it, beforeEach } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from './create-gym';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Register Gym Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });
  it('should be able to create gym ', async () => {
    const { gym } = await sut.execute({
      title: 'Javascript gym',
      description: null,
      phone: null,
      latitude: -5.4423411,
      longitude: -45.3120794,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
