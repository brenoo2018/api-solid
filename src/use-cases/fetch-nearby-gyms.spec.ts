import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'near gym',
      description: null,
      phone: null,
      latitude: -5.506135,
      longitude: -45.2444861,
    });

    await gymsRepository.create({
      title: 'far gym',
      description: null,
      phone: null,
      latitude: -7.5276538,
      longitude: -46.0526632,
    });
    const { gyms } = await sut.execute({
      userLatitude: -5.506135,
      userLongitude: -45.2444861,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'near gym' })]);
  });
});
