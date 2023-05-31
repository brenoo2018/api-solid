import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { FetchUserCheckInHistoryUseCase } from '../fetch-user-check-ins-history';

export function makeFetchUserCheckInHistoryUseCase() {
  const prismCheckinsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckInHistoryUseCase(prismCheckinsRepository);

  return useCase;
}
