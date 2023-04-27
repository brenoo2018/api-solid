import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './checkin';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('CheckIn Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  //red, green, refactor
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 27, 8, 0, 0));
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 27, 8, 0, 0));
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    vi.setSystemTime(new Date(2023, 0, 28, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });
});
