import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms';
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';

export function makeFetchNearbyGymsUseCase() {
  const prismCheckinsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(prismCheckinsRepository);

  return useCase;
}
