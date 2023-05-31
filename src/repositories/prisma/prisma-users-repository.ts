import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { UsersRepository } from '../users-repository';

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const findUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return findUser;
  }
  async findByEmail(email: string) {
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return findUser;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
