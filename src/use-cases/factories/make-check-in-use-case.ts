import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { CheckInUseCase } from '../checkin';
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';

export function makeCheckInUseCase() {
  const prismCheckinsRepository = new PrismaCheckInsRepository();
  const prismaGymsRepository = new PrismaGymsRepository();
  const useCase = new CheckInUseCase(
    prismCheckinsRepository,
    prismaGymsRepository
  );

  return useCase;
}
