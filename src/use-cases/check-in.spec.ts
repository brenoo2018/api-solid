import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './checkin';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxNumberOfCheckinsError } from './errors/max-number-of-check-ins-error';
import { MaxDistanceError } from './errors/max-distance-error';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('CheckIn Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: 'gym-01',
      title: 'js',
      description: '',
      phone: '',
      latitude: -7.5268096,
      longitude: -46.03904,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -7.5268096,
      userLongitude: -46.03904,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  //red, green, refactor
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 27, 8, 0, 0));
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -7.5268096,
      userLongitude: -46.03904,
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -7.5268096,
        userLongitude: -46.03904,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckinsError);
  });

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 27, 8, 0, 0));
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -7.5268096,
      userLongitude: -46.03904,
    });

    vi.setSystemTime(new Date(2023, 0, 28, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -7.5268096,
      userLongitude: -46.03904,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'js',
      description: '',
      phone: '',
      latitude: new Decimal(-5.4423411),
      longitude: new Decimal(-45.3120794),
    });

    await expect(
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -7.5268096,
        userLongitude: -46.03904,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
