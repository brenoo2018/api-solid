import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFetchUserCheckInHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-in-history-use-case';

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const historyCheckInQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = historyCheckInQuerySchema.parse(request.query);

  const historyCheckInUseCase = makeFetchUserCheckInHistoryUseCase();

  const { checkIns } = await historyCheckInUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({ checkIns });
}
