import { CreateGymUseCase } from '../create-gym';
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';

export function makeCreateGymUseCase() {
  const prismCheckinsRepository = new PrismaGymsRepository();
  const useCase = new CreateGymUseCase(prismCheckinsRepository);

  return useCase;
}
