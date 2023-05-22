import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymUseCase } from './search-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymUseCase;

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymUseCase(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'js gym',
      description: null,
      phone: null,
      latitude: -5.4423411,
      longitude: -45.3120794,
    });

    await gymsRepository.create({
      title: 'ts gym',
      description: null,
      phone: null,
      latitude: -5.4423411,
      longitude: -45.3120794,
    });
    const { gyms } = await sut.execute({
      query: 'js',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'js gym' })]);
  });

  it('should be able to fetch paginated gym search', async () => {
    for (let index = 1; index <= 22; index++) {
      await gymsRepository.create({
        title: `js gym ${index}`,
        description: null,
        phone: null,
        latitude: -5.4423411,
        longitude: -45.3120794,
      });
    }

    const { gyms } = await sut.execute({
      query: 'js',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: `js gym 21` }),
      expect.objectContaining({ title: `js gym 22` }),
    ]);
  });
});
